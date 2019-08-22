import os
from flask import Flask, render_template, request
from werkzeug import secure_filename

import numpy as np

import os
import cv2

import tensorflow as tf
from keras.models import load_model
from keras.models import model_from_json



app = Flask(__name__)
'''./static/models/model.h5'''

model = load_model('/home/eman/Downloads/model.h5')


@app.route('/')
def hello_world():
    if request.method == 'POST':
        f = request.files['file']
        f.save(os.path.join("./static/images/", f.filename))
        print("Done!")
    return render_template("index.html")


@app.route('/uploader', methods = ['GET', 'POST'])
def upload_file():
    if request.method == 'POST':
        f = request.files['file']
        file_path = os.path.join("./static/images/", f.filename)
        f.save(file_path)
        x = cv2.resize(cv2.imread(file_path, cv2.IMREAD_COLOR), (224,224))
        input_test = []

        input_test.append(x)
        input_test = np.array(input_test)
        with graph.as_default():
            pred = model.predict(input_test)
            if (pred[0][0] > pred[0][1]):
                print( "Healthy Eye : No Glocuma detexted")
            else:
                print("Glocuma Detected with accuracy")



if __name__ == '__main__':
    app.run(debug=True)
