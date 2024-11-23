const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 3000;

const upload = multer({ dest: 'uploads/' });

app.use(bodyParser.json());

const CLIENT_SECRET = 'pat_WMUekWBmUTfBOqLGLi5ofPpl1MRtsq3WYHaknyDQtYXkQQYmesdZaUE759PEETOu';

app.post('/send-message', async (req, res) => {
    const message = req.body.message;

    if (!message) {
        return res.status(400).send({ error: 'Сообщение не может быть пустым' });
    }

    try {
        const response = await axios.post(COZE_API_URL, {
            input: message
        }, {
            headers: {
                'Authorization': `Bearer ${CLIENT_SECRET}`
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
        const response = await axios.post(COZE_API_URL, {
            input: file.path,
            type: 'image'
        }, {
            headers: {
                'Authorization': `Bearer ${CLIENT_SECRET}`
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
