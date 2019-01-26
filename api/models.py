from kernel import db
from mixins import Timestamps
import datetime

class Model:
    id = db.Column(db.Integer, primary_key=True)

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

    def is_expired(self):
        """
        Returns True if the current rate is expired (older than a defined amount of time)
        """
        delta = datetime.datetime.now() - self.created_at

        return delta.total_seconds() > 15*60

class BudgetItem(db.Model, Model):
    __tablename__ = "budget_items"

    label = db.Column(db.String(200))
    ves = db.Column(db.Integer)
    budget_id = db.Column(db.Integer, db.ForeignKey("budgets.id"))
    
    budget = db.relationship("Budget", back_populates="items")

class Budget(db.Model, Model):
    __tablename__ = "budgets"

    title = db.Column(db.String(200))

    items = db.relationship("BudgetItem", back_populates="budget")

db.create_all()