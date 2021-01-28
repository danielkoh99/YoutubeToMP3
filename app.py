import time
from flask import Flask, jsonify, request, send_file, send_from_directory, after_this_request
from flask_cors import CORS, cross_origin
from pytube import YouTube
import os
import moviepy.editor as mp
import re
import asyncio
import glob

tgt_folder = "C:/Users/kohar/Desktop/YoURL/music/"
send_file

app = Flask(__name__)
app.config['CORS_HEADERS'] = 'Content-Type'
CORS(app)

req = {}
responseObj = {}


# filepath = tgt_folder + "Inverting Binary Trees - You Suck at Coding [1].mp3"


@app.route('/download', methods=["POST", "GET"])
def format_to_mp3():
    responseOk = {'status': 200}
    responseNotOk = {'status': 500}
   # responseErr = {'status':500}
    if request.method == "POST":
        reqFromApp = request.get_json()
        if reqFromApp != '':
            key = "url"
            req[key] = reqFromApp['url']
            print(req['url'])
            # return reqFromApp

            async def yuToMp3():
                y = YouTube(req['url'])

                # y = YouTube(str(req))
                t = y.streams.filter(only_audio=True)
                t[0].download(tgt_folder)
                # data = "song"
                # responseObj[data] = t[0]
                await asyncio.sleep(5)
                for file in [n for n in os.listdir(tgt_folder) if re.search('mp4', n)]:
                    # global full_path
                    full_path = os.path.join(tgt_folder, file)
                    output_path = os.path.join(
                        tgt_folder, os.path.splitext(file)[0] + '.mp3')
                    os.rename(full_path, output_path)
            asyncio.run(yuToMp3())
        else:
            return responseNotOk
    if request.method == "GET":

        # print()
        file = os.listdir('C:\\Users\\kohar\\Desktop\\YoURL\\music')
        mp3_files = glob.iglob('*/*.mp3', recursive=True)
        path = os.path.join(tgt_folder + file[0])
        for mp3 in mp3_files:
            return send_file(mp3, attachment_filename=mp3)

#         print(file[0])
# return send_file(mp3, attachment_filename=mp3)
        # @after_this_request
        # os.remove(mp3)

        # file_handle.close()
        # print(mp3)
    # files_path = [os.path.relpath(x) for x in os.listdir(folder)]
    # filePath = files_path[0].replace('\\', '/')
    # print(filePath)
    return responseOk


# print(file[0])
@app.route('/delete')
def delete():
    file = os.listdir('C:\\Users\\kohar\\Desktop\\YoURL\\music')
    filePath = os.path.join(tgt_folder + file[0])
    if os.path.isfile(filePath):
        os.remove('music/' + file[0])
        print('running')
        # os.remove(filePath)
    return 'ok'


@app.route('/download-file')
def return_files_tut():

    mp3_files = glob.iglob('*/*.mp3', recursive=True)

    for mp3 in mp3_files:
        time.sleep(1)
        return send_file(mp3, attachment_filename=mp3)
    # return send_from_directory(directory=path, filename=path)
# mp3_files = glob.iglob('*/*.mp3', recursive=True)
# for mp3 in mp3_files:
#     return send_file(mp3, attachment_filename=mp3)


# TODOS
# google cloud integration for blob
# send blob to client with # flask send_file method, then delete file
# download with react native fetch blob to directory


# @app.route('/download', methods=["GET"])
# @after_this_request
# async def yuToMp3():
#     # y = YouTube(response.url)
#     y = YouTube(req['url'])
#     # y = YouTube(str(req))
#     t = y.streams.filter(only_audio=True)
#     t[0].download(tgt_folder)
#     await asyncio.sleep(5)
#     for file in [n for n in os.listdir(tgt_folder) if re.search('mp4',n)]:
#             full_path = os.path.join(tgt_folder, file)
#             output_path = os.path.join(tgt_folder, os.path.splitext(file)[0] + '.mp3')
#             os.rename(full_path, output_path)
# asyncio.run(yuToMp3())
# return responseOk


# @app.route('/download',methods=["GET","POST"])
# @cross_origin(origin='*', headers=['Content-Type','Authorization'])
# async def formatToMp3():
#     global req
#     if request.method == 'POST':
#         req = request.get_json()
#         print(req)
#         return ''
#     else:
#         return ''

# if
#     req = request.form['url']
#     print(url)
#     return {'status':"200"}
# else:
#     return 'no'

# #  errors= []
# if request.method == "POST":
#      req= request.get_json()
#      print(req)
#      return req
# else:
#      return "Data recieved"


# asyncio.run(formatToMp3())
if __name__ == '__main__':
    app.run(debug=True, host='192.168.0.14', port=19000)
