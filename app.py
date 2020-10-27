import time
from flask import Flask, jsonify,request
from flask_cors import CORS
from pytube import YouTube
import os
import moviepy.editor as mp
import re
import asyncio
tgt_folder = "C:/Users/kohar/Downloads/music"




app = Flask(__name__)
CORS(app)

@app.route('/time')
def current_time():
    return {'time': time.time()}

@app.route('/download')
async def formatToMp3():
    getUrl= request.args.get('')
    print(getUrl)
#     y = YouTube("https://www.youtube.com/watch?v=tt2k8PGm-TI")
#     t = y.streams.filter(only_audio=True)
#     t[0].download(tgt_folder)
#     await asyncio.sleep(5)
#     for file in [n for n in os.listdir(tgt_folder) if re.search('mp4',n)]:
#         full_path = os.path.join(tgt_folder, file)
#         output_path = os.path.join(tgt_folder, os.path.splitext(file)[0] + '.mp3')
#         os.rename(full_path, output_path)

# asyncio.run(formatToMp3())



if __name__ == '__main__':
    app.run(host='192.168.0.14',port=19000)   
    