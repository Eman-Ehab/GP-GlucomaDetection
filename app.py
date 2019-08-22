import os
from flask import Flask, render_template, request
from werkzeug import secure_filename

app = Flask(__name__)

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
#      f.save(secure_filename(f.filename))
      f.save(os.path.join("./static/images/", f.filename))

      return 'file uploaded successfully'



if __name__ == '__main__':
    app.run(debug=True)
