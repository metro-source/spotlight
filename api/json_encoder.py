import inspect
import sys
import serializers
import flask
from flask.json import JSONEncoder as _JSONEncoder

##
# Magical way to get all serializers defined in the serializers module into a class
# serializer_classes = [_class for _class in inspect.getmembers(serializers) if inspect.isclass(_class)]
# serializer_names = [ _class.__name__ for _class in serializer_classes] 

# print(serializer_names)

all_serializers = { k:v for (k,v) in inspect.getmembers(serializers) if inspect.isclass(v) }
print(all_serializers)

class JSONEncoder(flask.json.JSONEncoder):
    def default(self, o):
        serializer_name = "{}Serializer".format(o.__class__.__name__)

        if serializer_name in all_serializers:
            Serializer = all_serializers[serializer_name](o)
            return Serializer.data
    
        return flask.json.JSONEncoder.default(self, o)

_dumps = flask.json.dumps
def dumps(obj, scope=None, **kwargs):
    flask.g.scope = scope
    return _dumps(obj, **kwargs)