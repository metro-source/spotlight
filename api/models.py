from kernel import db
from mixins import Timestamps

# class User(db.Model):
#     __tablename__ = 'users'

#     id  = db.Column(db.Integer, primary_key=True)
#     name = db.Column(db.String(100))

#     email = db.Column(db.String(100), index=True)
#     password = db.Column(db.String(255))
#     access_tokens = db.relationship("AccessToken", back_populates="user")

# class AccessToken(db.Model):
#     __tablename__ = 'access_tokens'

#     id = db.Column(db.Integer, primary_key=True)
#     token = db.Column(db.String(50), index=True)
#     id_user = db.Column(db.Integer, db.ForeignKey("users.id"))

#     user = db.relationship("User", back_populates="access_tokens")

class Rate(db.Model, Timestamps):
    __tablename__ = 'rates'

    id = db.Column(db.Integer, primary_key=True)
    price_per_coin = db.Column(db.Integer, primary_key=True)

db.create_all()