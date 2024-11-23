const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const multer = require('multer');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 3000;

const upload = multer({ dest: 'uploads/' });

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public'))); // Добавлено для обслуживания статических файлов

const CLIENT_SECRET = 'pat_WMUekWBmUTfBOqLGLi5ofPpl1MRtsq3WYHaknyDQtYXkQQYmesdZaUE759PEETOu';

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html')); // Обслуживание вашего HTML-файла
});

app.post('/send-message', async (req, res) => {
    const message = req.body.message;

    if (!message) {
        return res.status(400).send({ error: 'Сообщение не может быть пустым' });
    }

    try {
        // Пример эмуляции ответа API
        res.send({ reply: `Ваше сообщение было получено: "${message}"` });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Ошибка при отправке сообщения' });
    }
});

app.post('/upload-image', upload.single('image'), async (req, res) => {
    const file = req.file;

    if (!file) {
        return res.status(400).send({ error: 'Файл изображения не может быть пустым' });
    }

    try {
        // Пример эмуляции ответа API
        res.send({ reply: `Файл "${file.originalname}" был успешно загружен.` });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Ошибка при отправке изображения' });
    }
});

app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
});
