import string
import random
from sha256 import sha256

def hash(x):
    return sha256(x)

def generateSalt():
    return ''.join(random.sample(string.ascii_letters + string.digits, 15))

def newHash(p):
    s = generateSalt()
    return s, hash(p + s)

def checkHash(p, s, h):
    return hash(p + s) == h