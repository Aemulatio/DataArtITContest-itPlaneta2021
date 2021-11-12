import sys

if __name__ == '__main__':

    param_len = len(sys.argv)
    outputFile = False

    if param_len == 1:
        outputFile = False
        print("Чтобы выйти отправьте пустую строку")
        vvod = input().strip()
        while vvod != "" and len(vvod) > 0:
            print(eval(vvod))
            vvod = input().strip()
    else:
        outputFile = True
        f = open(sys.argv[1], 'r', encoding='UTF-8')
        fdata = f.readlines()
        f.close()
        f = open(sys.argv[2], 'w', encoding='UTF-8')
        for fd in fdata:
            if fd[0] == '#':
                continue
            if len(fd.strip()) > 0:
                f.write(str(eval(fd.strip())) + "\n")