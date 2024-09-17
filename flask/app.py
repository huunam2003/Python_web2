from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:mysqlpassword0411@localhost/test2'  # Change this for MySQL
CORS(app)# core
db = SQLAlchemy(app)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(100), nullable=False)
    password = db.Column(db.String(100), nullable=False)
    
    def to_dict(self):
        return {
            "email": self.email,
            "password": self.password
        }

# Initialize DB (for testing, remove in production)
with app.app_context():
    db.create_all()

# Route to get all users
@app.route("/", methods=["GET"])
def get_users():
    users = User.query.all()
    return jsonify([user.to_dict() for user in users])

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
    print(existing_user)
    if existing_user:
        return jsonify({"message":"dang nhap thanh cong!"})
    else:
        return jsonify({"message": "Mat khau hoac email khong dung"}),404

if __name__ == "__main__":
    app.run(debug=True)
