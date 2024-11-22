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

const CLIENT_ID = '1106953570651';
const CLIENT_SECRET = 'pat_WMUekWBmUTfBOqLGLi5ofPpl1MRtsq3WYHaknyDQtYXkQQYmesdZaUE759PEETOu'; // Ваш секрет клиента
const REDIRECT_URI = 'https://feldyai.onrender.com/auth/callback';
const AUTH_URL = 'https://api.coze.example.com/oauth/token';
const COZE_API_URL = 'https://api.coze.example.com/v1/messages';

async function getToken() {
    const response = await axios.post(AUTH_URL, {
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        grant_type: 'client_credentials',
        redirect_uri: REDIRECT_URI
    });

    return response.data.access_token;
}

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html')); // Обслуживание вашего HTML-файла
});

app.post('/send-message', async (req, res) => {
    const message = req.body.message;

    if (!message) {
        return res.status(400).send({ error: 'Сообщение не может быть пустым' });
    }

    try {
        const token = await getToken();
        const response = await axios.post(COZE_API_URL, {
            input: message
        }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        res.send({ reply: response.data.output });
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
        const token = await getToken();
        const response = await axios.post(COZE_API_URL, {
            input: file.path,
            type: 'image'
        }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        res.send({ reply: response.data.output });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Ошибка при отправке изображения' });
    }
});

app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
});

