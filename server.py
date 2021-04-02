import time
from flask import Flask, jsonify, request, send_file, send_from_directory, after_this_request
from flask_cors import CORS, cross_origin
from pytube import YouTube
import os
import moviepy.editor as mp
import re
import asyncio
import glob


app = Flask(__name__)
# run_with_ngrok(app)
app.config['CORS_HEADERS'] = 'Content-Type'
CORS(app)

req = {}
responseObj = {}

tgt_folder = "C:/Users/kohar/Desktop/YoURL/"


# filepath = tgt_folder + "Inverting Binary Trees - You Suck at Coding [1].mp3"


@app.route('/download', methods=["POST", "GET"])
def format_to_mp3():
    responseOk = {'status': 200}
    responseNotOk = {'status': 500}
   # responseErr = {'status':500}
    if request.method == "POST":
        reqFromApp = request.get_json()
        print(reqFromApp)
        if reqFromApp != '':
            key = "url"
            newkey = "id"
            req[key] = reqFromApp['url']
            req[newkey] = reqFromApp['deviceID']
            # print(req)
            print(reqFromApp)
            print(req['url'])
            print(req['id'])
            # return reqFromApp

            async def yuToMp3():
                y = YouTube(req['url'])

                # y = YouTube(str(req))
                t = y.streams.filter(only_audio=True)
                t[0].download(tgt_folder+req['id'])
                # data = "song"
                # responseObj[data] = t[0]
                await asyncio.sleep(5)
                for file in [n for n in os.listdir(tgt_folder+req['id']) if re.search('mp4', n)]:
                    # global full_path
                    full_path = os.path.join(tgt_folder+req['id'], file)
                    output_path = os.path.join(
                        tgt_folder + req['id'], os.path.splitext(file)[0] + '.mp3')
                    os.rename(full_path, output_path)
            asyncio.run(yuToMp3())
        else:
            return responseNotOk
    if request.method == "GET":
        # return ''
        # print()
        # file = os.listdir(
        #     'C:\\Users\\kohar\\Desktop\\YoURL\\' + req['id'])
        # mp3_files = glob.iglob('*/*.mp3', recursive=True)
        # # path = os.path.join(tgt_folder + file[0])
        # # print(req)

        # for mp3 in mp3_files:
        #     return send_file(mp3, attachment_filename=mp3)

        return responseOk
    filename = os.listdir('C:\\Users\\kohar\\Desktop\\YoURL\\' + req['id'])[0]
    filenameWithoutExtension = filename[:-4]
    responseData = jsonify(
        {'downloadUrl': 'https://convert.loca.lt/download-file?id=' + req['id'], 'originalName': filenameWithoutExtension})
# send back static url to download from, must do in front end!!

    return responseData

# print(file[0])


@ app.route('/delete')
def delete():
    getInfo = request.args.get('id')
    path = 'C:\\Users\\kohar\\Desktop\\YoURL\\' + getInfo
    print(path)
    mp3_files = glob.iglob(path + '/*.mp3', recursive=True)
    # path = os.path.join(tgt_folder + file[0])
    # print(req)
    for mp3 in mp3_files:
        os.remove(mp3)
    # getId = request.args.get('id')
    # path = 'C:\\Users\\kohar\\Desktop\\YoURL\\' + getId
    # # file = os.listdir('C:\\Users\\kohar\\Desktop\\YoURL\\')
    # file = os.listdir(path)
    # filePath = os.path.join(getId + '/' + file[0])
    # print(file)
    # print(filePath)
    # if os.path.isfile(filePath):
    #     os.remove(getId + '/' + file[0])
        # print('running')
        # os.remove(filePath)
    return 'deleted'


@ app.route('/download-file')
def return_file():
    getInfo = request.args.get('id')
    path = 'C:\\Users\\kohar\\Desktop\\YoURL\\' + getInfo
    # print(path)
    mp3_files = glob.iglob(path + '/*.mp3', recursive=True)
    # path = os.path.join(tgt_folder + file[0])
    # print(req)
    for mp3 in mp3_files:
        print(mp3)
        return send_file(mp3, attachment_filename=mp3)
    # mp3_files = glob.iglob('*/*.mp3', recursive=True)

    return 'ok'
# for mp3 in mp3_files:
#         time.sleep(1)


# asyncio.run(formatToMp3())
if __name__ == '__main__':
    # app.run()
    # app.run(debug=True, host='127.0.0.1', port=19000)
    # app.run(debug=True, host='192.168.0.14', port=19000)
    app.run(debug=True, port=19000)
# if __name__ == "__main__":
#     app.run()
