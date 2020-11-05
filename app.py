import time
from flask import Flask, jsonify,request,after_this_request
from flask_cors import CORS,cross_origin
from pytube import YouTube
import os
import moviepy.editor as mp
import re
import asyncio
tgt_folder = "C:/Users/kohar/Downloads/music"



app = Flask(__name__)
app.config['CORS_HEADERS'] = 'Content-Type'
CORS(app)

req = {}

@app.route('/time')
def current_time():
    return {'time': time.time()}

@app.route('/download',methods=["GET","POST"])
def format_to_mp3():
    responseOk = {'status':200}
    # responseErr = {'status':500}
    if request.method == 'POST':
        reqFromApp = request.get_json()
        key= "url"
        req[key]=reqFromApp['url']
    print(req['url'])
    
    @after_this_request  
    async def yuToMp3():
        y = YouTube(req['url'])
        # y = YouTube(str(req))
        t = y.streams.filter(only_audio=True)
        t[0].download(tgt_folder)
        await asyncio.sleep(5)
        for file in [n for n in os.listdir(tgt_folder) if re.search('mp4',n)]:
                full_path = os.path.join(tgt_folder, file)
                output_path = os.path.join(tgt_folder, os.path.splitext(file)[0] + '.mp3')
                os.rename(full_path, output_path)     
    asyncio.run(yuToMp3())
    return responseOk


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
    app.run(debug=True,host='192.168.0.14',port=19000)   
    