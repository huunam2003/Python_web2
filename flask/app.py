from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
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
    #image = db.Column(db.String(100), nullable = False)
    def to_dict(self):
            return {
                "id": self.id,
                "name": self.name,
                "type": self.type,
                "countinstock": self.countinstock,
                "price": self.price
                #"password": self.password,

            }

# Initialize DB (for testing, remove in production)
with app.app_context():
    db.create_all()

# Route to get all users
@app.route("/user", methods=["GET"])
def get_users():
    users = User.query.all()
    return jsonify([user.to_dict() for user in users])

@app.route("/admin", methods=["GET"])
def get_products():
    products = Product.query.all()
    return jsonify([product.to_dict() for product in products])

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

@app.route("/admin", methods = ["POST" , "GET"])
def admin():
    data= request.get_json()
    # try:
    #     image = request.files['image']  # Get image file from the form
    #     image = image.filename

        
    new_admin = Product(name=data['name'], 
                        type=data['type'],
                        countinstock=int(data['countInStock']),
                        price=int(data['price']),
                        description=data['description'],
                        #image = "NULL"
                        )

    db.session.add(new_admin)
    db.session.commit()
    # except Exception as e:
    #     print(e)
    #     return jsonify("failed")
    return jsonify("ok")


if __name__ == "__main__":
    app.run(debug=True)
