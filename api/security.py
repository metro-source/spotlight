import bcrypt

def hash_password(password):
    if type(password) is str:
        password = password.encode()
    
    return bcrypt.hashpw(password.encode(), bcrypt.gensalt())

def check_password(password, hashed):
    if type(password) is str:
        password = password.encode()
    
    if type(hashed) is str:
        hashed = hashed.encode()

    return bcrypt.checkpw(password, hashed)