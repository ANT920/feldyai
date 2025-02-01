from chatterbot import ChatBot
from chatterbot.trainers import ChatterBotCorpusTrainer

# Создание нового экземпляра ChatBot
bot = ChatBot('FeldyAI')

# Устанавливаем тренера для нашего бота
trainer = ChatterBotCorpusTrainer(bot)

# Тренировка бота на стандартных данных
trainer.train("chatterbot.corpus.russian")

# Функция для общения с ботом
def chat_with_bot():
    print("Привет! Я FeldyAI 2.0. Как я могу помочь вам сегодня?")
    while True:
        try:
            user_input = input()
            bot_response = bot.get_response(user_input)
            print(f"FeldyAI 2.0: {bot_response}")
        except (KeyboardInterrupt, EOFError, SystemExit):
            break

# Начало общения с ботом
chat_with_bot()
