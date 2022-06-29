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




@app.route('/download', methods=["POST", "GET"])
def format_to_mp3():
    responseOk = {'status': 200}
    responseNotOk = {'status': 500}
   
    if request.method == "POST":
        reqFromApp = request.get_json()
        print(reqFromApp)
        if reqFromApp != '':
            key = "url"
            newkey = "id"
            req[key] = reqFromApp['url']
            req[newkey] = reqFromApp['deviceID']
            
            print(reqFromApp)
            print(req['url'])
            print(req['id'])
           

            async def yuToMp3():
                y = YouTube(req['url'])

              
                t = y.streams.filter(only_audio=True)
                t[0].download(tgt_folder+req['id'])
               
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
        

        return responseOk
    filename = os.listdir('C:\\Users\\kohar\\Desktop\\YoURL\\' + req['id'])[0]
    filenameWithoutExtension = filename[:-4]
    responseData = jsonify(
        {'downloadUrl': 'https://converter.loca.lt/download-file?id=' + req['id'], 'originalName': filenameWithoutExtension})
# send back static url to download from, must do in front end!!

    return responseData




@ app.route('/delete')
def delete():
    getInfo = request.args.get('id')
    path = 'C:\\Users\\kohar\\Desktop\\YoURL\\' + getInfo
    print(path)
    mp3_files = glob.iglob(path + '/*.mp3', recursive=True)
    
    for mp3 in mp3_files:
        os.remove(mp3)
    
    return 'deleted'


@ app.route('/download-file')
def return_file():
    getInfo = request.args.get('id')
    path = 'C:\\Users\\kohar\\Desktop\\YoURL\\' + getInfo
    
    mp3_files = glob.iglob(path + '/*.mp3', recursive=True)
    
    for mp3 in mp3_files:
        print(mp3)
        return send_file(mp3, attachment_filename=mp3)
    

    return 'ok'


if __name__ == '__main__':
    
    app.run(debug=True, port=19000)

