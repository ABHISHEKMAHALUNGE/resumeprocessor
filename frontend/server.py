from flask import Flask, request

app = Flask(__name__)

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return 'No file uploaded', 400

    file = request.files['file']

    # Save the uploaded file to a desired location
    file.save('/path/to/save/file.pdf')

    return 'File uploaded successfully'

if __name__ == '__main__':
    app.run()
#from resume_parser import resumeparse
#backend\uploads\file-1686649018812.pdf
# resume_text = extract_text_from_pdf("./uploads/file-1686649018812.pdf")
# print(resume_text)

# def main(d):
#     #data = resumeparse.read_file(d)
#     data = ResumeParser(d).get_extracted_data()
#     print(json.dumps(data))
# if __name__ =='__main__':
#     main(sys.argv[1])    