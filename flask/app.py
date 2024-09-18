from flask import Flask, jsonify, request,Response,send_file
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import base64
import io
import re
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:mysqlpassword0411@localhost/test2'  # Change this for MySQL
  # Change this for MySQL
CORS(app)# core
db = SQLAlchemy(app)

class User(db.Model):
    #__tablename__ = 'user' 
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(100), nullable=False)
    password = db.Column(db.String(100), nullable=False)
    
    def to_dict(self):
        return {
            "email": self.email,
            "password": self.password
        }
class Product(db.Model):
    #__tablename__ = 'admin' 
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable = False)
    type = db.Column(db.String(100), nullable=False)
    countinstock = db.Column(db.Integer, nullable=False)
    price = db.Column(db.Double, nullable=False)
    description = db.Column(db.String(100), nullable = False)
    image = db.Column(db.LargeBinary) 
    def to_dict(self):
            return {
                "id": self.id,
                "name": self.name,
                "type": self.type,
                "countinstock": self.countinstock,
                "price": self.price,
                "image" : base64.b64encode(self.image).decode('utf-8')[:50] if self.image else None
            }

# Initialize DB (for testing, remove in production)
with app.app_context():
    db.create_all()

# Route to get all users
# @app.route("/user", methods=["GET"])
# def get_users():
#     users = User.query.all()
#     return jsonify([user.to_dict() for user in users])

# @app.route("/admin", methods=["GET"])
# def get_products():
#     products = Product.query.all()
#     return jsonify([product.to_dict() for product in products])

# Route to submit form data
@app.route("/submit", methods=["POST"])
def submit_form():
    data = request.get_json()
    email = data['email']
    existing_user = User.query.filter_by(email=email).first() # neu email ton tai 
    if existing_user:
        
        return jsonify({"message": "Email bi trung !"}),404
    else:
        new_user = User(email=data['email'], password=data['password'])
        db.session.add(new_user)
        db.session.commit()
        return jsonify("ADD User thanh cong!")
    
@app.route("/signin", methods=["POST"])
def signin():
    data = request.get_json()
    email = data['email']
    password = data['password']
    existing_user = User.query.filter_by(email=email, password = password).first()

    if existing_user:
        return jsonify({"message":"dang nhap thanh cong!", "email" : existing_user.email , 'status' : 1})
    else:
        return jsonify({"message": "Mat khau hoac email khong dung" ,'status' : 0}),404


@app.route('/admin/<filename>', methods = ['GET'])
def getImage(filename):
    product = Product.query.filter_by(name = filename).first()
    if product and product.image:
        # Base64 encode the binary image data
        encoded_image = base64.b64encode(product.image).decode('utf-8')
        # Prefix the data with 'data:image/png;base64,' so it can be rendered in React
        img = f"data:image/png;base64,{encoded_image}"
        print(img[:30])
    else:
        img = None

    return jsonify({"image" : img})


@app.route("/admin", methods = ["POST" , "GET"])
def admin():
    if request.method == 'GET':
        products = Product.query.all()
        return jsonify([product.to_dict() for product in products])
    data = request.get_json()
    image_base64 = data['image']
    print(image_base64[:30])
    image_base64 = re.sub(r'^data:image/[a-zA-Z]+;base64,', '', image_base64)
    # # Fix Base64 padding if necessary
    # missing_padding = -len(image_base64) % 4
    # if missing_padding:
    #     image_base64 += '=' * (4 - missing_padding)
    
    # # Decode the Base64 image string to binary
    image_binary = base64.b64decode(image_base64)
    try:
        new_product = Product(
            name=data['name'],
            price=float(data['price']),
            description=data['description'],
            type=data['type'],
            countinstock=int(data['countInStock']),
            image=image_binary  # Store Base64 image string
        )
        db.session.add(new_product)
        db.session.commit()
        return jsonify({"message" : "Product added successfully"}), 201  # Success response
    except Exception as e:
        print(e)
        return jsonify({"message":"Failed to add product"}), 500  # Error response



@app.route('/filter', methods = ["GET", "POST"])
def filter():
    products  = Product.query.all()
    return jsonify([product.to_dict() for product in products])

#///////////////////////////////////////////////////////
# @app.route('/upload', methods=['POST'])
# def upload_image():
#     data = request.json
#     image_base64 = data['image'].split(',')[1]  # Remove the prefix data:image/png;base64,
#     image_data = base64.b64decode(image_base64)
#     name = data.get('name', 'untitled')

#     new_product = Product(name=name, image=image_data)
#     db.session.add(new_product)
#     db.session.commit()

#     return jsonify({'message': 'Image uploaded successfully'}), 201

# @app.route('/admin2/<filename>', methods=['GET'])
# def get_image(filename):
#     product = Product.query.filter_by(name=filename).first()
#     if not product:
#         return jsonify({'message': 'Image not found'}), 404

#     return send_file(
#         io.BytesIO(product.image),
#         mimetype='image/png',
#         as_attachment=False,
#         download_name=filename
#     )
if __name__ == "__main__":
    app.run(debug=True)
