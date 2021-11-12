import os
import zipfile
import gzip
import sys
import re
from os import path, listdir
import shutil
import hashlib


def id(path):
    return hashlib.md5(path.encode()).hexdigest()[:6]


def unZip(path, file):
    with zipfile.ZipFile(path.replace("\\", "/") + "/" + file, 'r') as curZip:
        curZip.extractall(path.replace("\\", "/") + "/" + id(path.replace("\\", "/") + "/" + file))


def unZipAll(path):
    for root, dirs, files in os.walk(path, topdown=False):
        zips = [file for file in files if ".zip" in file]
        for zip in zips:
            unZip(root, zip)
            os.remove(root.replace("\\", "/") + "/" + zip)

    for root, dirs, files in os.walk(path, topdown=False):
        gzs = [file for file in files if '.gz' in file]
        for gz in gzs:
            with gzip.open(root.replace("\\", "/") + "/" + gz, 'rb') as f:
                file_content = f.read()
                with open(root.replace("\\", "/") + "/" + gz + ".txt", 'w', encoding='utf-8') as newTxt:
                    newTxt.write(file_content.decode('utf-8'))
            os.remove(root.replace("\\", "/") + "/" + gz)


if __name__ == '__main__':
    params = sys.argv
    filePath = params[1]
    savePath = "./tmp/"
    if len(params) > 2:
        with zipfile.ZipFile(filePath, 'r') as myzip:
            savePath = params[2]
            myzip.extractall(savePath)
    else:
        with zipfile.ZipFile(filePath, 'r') as myzip:
            myzip.extractall(savePath)

    unZipAll(savePath)

    uniqNumbers = set()
    uniqEmails = set()

    for root, dirs, files in os.walk(savePath, topdown=False):
        #
        # print("root", root)
        # print('files', files)
        #
        txts = [file for file in files if ".txt" in file]
        if len(txts) > 0:
            for txt in txts:
                uniq = set()
                with open(root.replace("\\", "/") + "/" + txt, 'r', encoding='utf-8') as f:
                    for row in f:
                        uniq.add(row.strip())

                # print(uniq, " - 67")
                for e in uniq:
                    numberString = str()
                    for s in re.split(r'[ ,:;\t]+', e):  # e.split(' '):  # #e.split(' '):
                        if "@" in s:
                            if '.org' in s:
                                uniqEmails.add(s)
                        elif len(s.strip()) > 0:

                            op = s.find("(")
                            if op == 0 and len(s) == 5:  # s[0] == "(":
                                # print(op)
                                ss = [x for x in s]
                                if ss[op + 1] == '1':
                                    ss[op + 1] = 4
                                elif ss[op + 1] == '2':
                                    ss[op + 1] = 8
                                elif ss[op + 1] == '3':
                                    ss[op + 2] = 2
                                s = ''.join(str(sss) for sss in ss)
                            elif op > 0 and s[op + 4]:
                                # print(s[op + 3], '3')
                                # print(s[op + 4], '4')
                                pass

                            numberString += s.replace("(", ' (').replace(")", ") ").replace("-", '')
                    uniqNumbers.add(numberString)
                f = open("./phones.txt", 'w', encoding='utf-8')
                for uN in sorted(uniqNumbers):
                    f.write(uN + "\n")
                f.close()
                f = open("./emails.txt", 'w', encoding='utf-8')
                for uE in sorted(uniqEmails):
                    f.write(uE + "\n")
                f.close()
                pass

    zipA = zipfile.ZipFile("./all.zip", "w")
    for root, dirs, files in os.walk(savePath, topdown=False):

        for filename in files:
            filePath = os.path.join(root, filename)
            zipA.write(filePath)

    zipA.write("phones.txt")
    zipA.write("emails.txt")

    shutil.rmtree(savePath)
