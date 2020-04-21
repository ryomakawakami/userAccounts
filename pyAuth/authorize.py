import sys
import hasher

def checkPassword(username, password):
    with open('admin/accounts', 'r') as f:
        for line in f:
            u, s, h = line.strip().split(' ')
            if u == username:
                if hasher.checkHash(password, s, h):
                    return 0
                else:
                    return 1
    return 1

# Get user input
username, password = sys.argv[1:]

if username == "" or password == "":
    print(1)
    sys.exit()

x = checkPassword(username, password)
print(x)
