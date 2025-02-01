from flask import Flask
from chatterbot import ChatBot
from chatterbot.trainers import ChatterBotCorpusTrainer

app = Flask(__name__)

bot = ChatBot('FeldyAI')
trainer = ChatterBotCorpusTrainer(bot)
trainer.train("chatterbot.corpus.russian")

@app.route('/')
def home():
    return "Привет! Я FeldyAI 2.0. Как я могу помочь вам сегодня?"

if __name__ == "__main__":
    app.run()
