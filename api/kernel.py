"""
A Flask-based JSON API for our projects
"""

from flask import Flask, jsonify as jsonify, request, render_template
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import raiseload, joinedload
from database import db_user, db_pass, db_name
from json_encoder import JSONEncoder, dumps
import flask.json
import config
import os.path

app = Flask(__name__)

app.json_encoder = JSONEncoder
flask.json.dumps = dumps

app.config["SQLALCHEMY_DATABASE_URI"] = "mysql://{}:{}@localhost/{}".format(db_user, db_pass, db_name)
app.config["SQLALCHEMY_ECHO"] = True

"""
User-defined configuration
"""
app.config.from_object(config.AppSettings)

if os.path.exists("app_config.py"):
    app.config.from_pyfile("app_config.py")

db = SQLAlchemy(app)

import main
