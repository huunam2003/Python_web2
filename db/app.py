from flask import Flask, render_template, url_for, request,redirect, jsonify,session
from flask_sqlalchemy import SQLAlchemy
#from flask_restful import Api, Resource, reqparse
from datetime import datetime
#from flask_bcrypt import Bcrypt

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = 'mysql+pymysql://root:mysqlpassword0411@localhost/test2'

db = SQLAlchemy(app)

app.app_context().push()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(100), nullable=False)
    password = db.Column(db.String(100), nullable=False)

    def to_dict(self):
        return {
            "email": self.email,
            "password": self.password
        }
    def __repr__(self):
        return '<Task %r>' % self.id


# class Order(db.Model): 


# class Product 

# class User

# class 
    


@app.route('/', methods=['POST', 'GET'])
def index():
    if request.method == 'POST':
        task_email = request.form['email']
        task_password = request.form['password']
        new_task = User(password = task_password, email = task_email)

        try:
            db.session.add(new_task)
            db.session.commit()
            return redirect('/')
        except:
            return 'There was an issue adding your task'
    else:
        tasks = User.query.order_by(User.email).all()
        return render_template('index.html', tasks=tasks)

@app.route('/delete/<int:id>')
def delete(id):
    print("delete")
    task_to_delete = User.query.get_or_404(id)
    db.session.expire_all()
    try:
        db.session.delete(task_to_delete)
        db.session.commit()
        return redirect('/')
    except:
        return 'There was a problem deleting that task'

@app.route('/update/<int:id>', methods=['GET', 'POST'])
def update(id):
    task = User.query.get_or_404(id)
    db.session.expire_all()
    if request.method == 'POST':
        task.email = request.form['email']
        task.password = request.form['password']
        try:
            db.session.commit()
            return redirect('/')
        except:
            return 'There was an issue updating your task'

    else:
        return render_template('update.html', task=task)


# @app.route('/signin', methods = ['GET', "POST"])
# def signin():
#     data = request.json()
#     email = data.

#     return render_template('signin.html', tasks=tasks)




if __name__ == "__main__":
    app.run(debug=True)