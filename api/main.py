"""
Routes should be defined in this module
"""
from kernel import app, db
import models
import rates
from security import hash_password, check_password
from flask import request
from flask.json import jsonify

@app.route("/api/rate")
def get_rate():
    last_rate = models.Rate.query.order_by(models.Rate.id.desc()).first()

    if last_rate is None:
        last_rate = models.Rate()
        last_rate.price_per_coin = rates.get_ves_rate()
        
        db.session.add(last_rate)
        db.session.commit()

    return jsonify(last_rate)

@app.route("/api/create_user", methods=["POST"])
def create_user():
    params = request.get_json()

    user = models.User()

    user.name = params['name']
    user.email = params['email']
    user.password = hash_password(params['password'])

    db.session.add(user)
    db.session.commit()

    return jsonify(user)

@app.route("/api/sign_in", methods=["POST"])
def sign_in():
    params = request.get_json()

    user = models.User.query.filter_by(email=params["email"]).first()

    if user is None:
        return jsonify(error="User doesn't exist")
    
    if check_password(params["password"], user.password):
        return jsonify({
                "ok": True
        })
    else:
        return jsonify({
                "notok": True
        })