from logging import debug
import google.generativeai as genai
from flask import Flask, jsonify, render_template, request
from flask_cors import CORS
from configs import GOOGLE_GEMINI_API_KEY

app = Flask(__name__)
CORS(app, resources={r"/message": {"origins": "http://127.0.0.1:5000"}})

genai.configure(api_key=GOOGLE_GEMINI_API_KEY)
model  = genai.GenerativeModel('gemini-1.5-flash')
chat = model.start_chat(
        history= [
                {"role": "user", "parts": "Answer everytyme in a cocky and humourous way and use emojis too."},
                {"role": "model", "parts": "Sure, what would you like to know"}
            ]
        )


def generateResponse(message):
    response = chat.send_message(message)
    return response

@app.route("/")
def hello_world():
    return render_template('index.html') 

@app.route("/message", methods=["POST"])
def respond_message():
    print("processing response")
    message_body = request.get_json()
    message_content = message_body.get('message')
    model_response = chat.send_message(message_content)
    model_response = model_response.to_dict()
    response_text = model_response.get('candidates')[0].get('content').get('parts')[0].get('text')
    print(response_text)
    return jsonify({"response" : response_text})

app.run(debug = True)



