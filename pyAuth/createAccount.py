import sys, json
import userParser


def validateInfo(info):
    toRet = True
    accounts = open("plaintext/accounts", 'r')
    lines = accounts.readlines()
    for line in lines:
        line = line.strip()
        account = userParser.parse(line)
        if(info[0] == account[0] or info[1] == account[1]):
            toRet = False
            break
    accounts.close()
    return toRet

info = [sys.argv[1], sys.argv[2]]
x = validateInfo(info)
print(str(x).strip())
    
