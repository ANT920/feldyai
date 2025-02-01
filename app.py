from flask import Flask, request
from chatterbot import ChatBot
from chatterbot.trainers import ChatterBotCorpusTrainer

app = Flask(__name__)

bot = ChatBot('FeldyAI')
trainer = ChatterBotCorpusTrainer(bot)
trainer.train("chatterbot.corpus.russian")

@app.route('/')
def home():
    return "Привет! Я FeldyAI 2.0. Как я могу помочь вам сегодня?"

@app.route('/chat', methods=['POST'])
def chat():
    user_input = request.form['text']
    bot_response = bot.get_response(user_input)
    return str(bot_response)

if __name__ == "__main__":
    app.run()
