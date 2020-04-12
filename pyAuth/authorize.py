import sys

def checkPassword(username, password):
    with open('admin/accounts', 'r') as f:
        for line in f:
            u, p = line.strip().split(' ')
            if u == username:
                if p == password:
                    return 0
                else:
                    return 1

# Get user input
username, password = sys.argv[1:]

if username == "" or password == "":
    print(1)
    sys.exit()

x = checkPassword(username, password)
print(x)
