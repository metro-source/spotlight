"""
Serializers should be defined in this module

Anything that gets rendered in a json response should have a serializer
"""
import flask

class BaseSerializer():
    def __init__(self, base_object, scope = None):
        self.data = {}
        self.base_object = base_object
        self.scope = flask.g.get("scope", None)

        self.register_fields()

    def register_fields(self):
        pass

    def add_field(self, name, condition = True):
        if condition:
            self.data[name] = getattr(self.base_object, name)

    def add_fields(self, names, condition = True):
        if condition:
            for field_name in names:
                self.add_field(field_name)

class RateSerializer(BaseSerializer):
    def register_fields(self):
        self.add_fields(['id', 'created_at', 'price_per_coin'])
    
