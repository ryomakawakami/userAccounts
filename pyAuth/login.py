from getpass import getpass

def checkPassword(username, password):
    with open('simple/accounts') as fp:
        for line in fp:
            u, p = line.split(' ')
            p = p[:-1]
            if u == username:
                if p == password:
                    return 0
                else:
                    return 1
    return 2

while True:
    username = input('Username: ')
    password = getpass()

    result = checkPassword(username, password)

    if result == 0:
        print('Hello %s!' % username)
    elif result == 1:
        print('Wrong password')
    else:
        print('Invalid username')

    print()
