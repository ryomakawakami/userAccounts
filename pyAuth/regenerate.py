import os
import hasher

with open('admin/backup', 'r') as f:
    with open('admin/new', 'w') as fo:
        for line in f:
            u, p = line.strip().split(' ')
            s, h = hasher.newHash(p)
            fo.write(u + ' ' + s + ' ' + h + '\n')
