import sys

def validateInfo(u, p):
    with open("admin/accounts", 'r') as f:
        for line in f:
            account = line.strip().split(' ')
            if(u == account[0]):
                return 1
    return 0

# Get user input
username, password, confirm = sys.argv[1:]

# Disgusting code
if username == "":
    print(2)
    sys.exit()
if password == "":
    print(3)
    sys.exit()
if password != confirm:
    print(4)
    sys.exit()

x = validateInfo(username, password)
print(x)
