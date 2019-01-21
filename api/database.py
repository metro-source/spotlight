import os
import json

file_name = "db.json"

if os.path.exists(file_name) is False:
    raise "Could not find db.json, make sure it exists"

data = json.loads(open(file_name).read())

db_user = data['user']
db_pass = data['pass']
db_name = data['db']