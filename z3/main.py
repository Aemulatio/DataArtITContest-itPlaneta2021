import os
import zipfile
import sys
import re
from os import path, listdir

import shutil

if __name__ == '__main__':
    params = sys.argv
    filePath = params[1]
    savePath = "./tmp/"
    if len(params) > 2:
        print("path")
        with zipfile.ZipFile(filePath, 'r') as myzip:
            savePath = params[2]
            myzip.extractall(savePath)
    else:
        print("./")
        with zipfile.ZipFile(filePath, 'r') as myzip:
            print(myzip)
            myzip.extractall(savePath)

    print(savePath)

    print("start")
    for root, dirs, files in os.walk(savePath, topdown=False):

        uniqNumbers = set()
        uniqEmails = set()

        print("root", root)
        print("dirs", dirs)
        print('files', files)

        txts = [file for file in files if ".txt" in file]
        if len(txts) > 0:
            for txt in txts:
                uniq = set()
                with open(root.replace("\\", "/") + "/" + txt, 'r', encoding='utf-8') as f:
                    for row in f:
                        uniq.add(row.strip())

                print(uniq)
                for e in uniq:
                    numberString = str()
                    for s in re.split(r'[ ,:;\t]', e):  # e.split(' '):  # #e.split(' '):
                        if "@" in s:
                            if '.org' in s:
                                uniqEmails.add(s)
                        elif len(s.strip()) > 0:
                            if s[0] == "(":
                                ss = [x for x in s]
                                if ss[1] == '1':
                                    ss[1] = 4
                                elif ss[1] == '2':
                                    ss[1] = 8
                                else:
                                    ss[2] = 2
                                s = ''.join(str(sss) for sss in ss)
                            numberString += s.replace("(", ' (').replace(")", ") ").replace("-", '')
                    uniqNumbers.add(numberString)
                f = open("./phones.txt", 'w', encoding='utf-8')
                for uN in uniqNumbers:
                    f.write(uN + "\n")
                f.close()
                f = open("./emails.txt", 'w', encoding='utf-8')
                for uE in uniqEmails:
                    f.write(uE + "\n")
                f.close()
                pass










    # shutil.rmtree(savePath)
