def parse(line):
    info = ['', '']
    i = 1
    for character in line:
        if(character == " "):
            info[0] = line[0:i-1]
            break
        i+=1
    info[1] = line[i:]
    return info


