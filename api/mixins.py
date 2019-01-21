"""
Mixins that might be useful when developing
"""
from sqlalchemy import event
from datetime import datetime
from kernel import db

class Timestamps(object):
    """
    Adds 2 columns: created_at and updated_at, these get updated 
    automatically whenever the object is created or updated
    """
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime)

@event.listens_for(Timestamps, 'before_insert')
def receive_before_insert(self):
    print("Calling before_insert")
    print(self)
    self.created_at = datetime.utcnow()

@event.listens_for(Timestamps, 'before_update')
def receive_before_update(self):
    self.updated_at = datetime.utcnow()