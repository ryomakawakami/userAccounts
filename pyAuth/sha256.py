import hashlib

def sha256(x):
    return hashlib.sha256(x.encode('utf-8')).hexdigest()
