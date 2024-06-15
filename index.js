const express = require('express');
const TelegramBot = require('node-telegram-bot-api');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const defaultChatID = process.env.DEFAULT_CHAT_ID;

const token = process.env.TOKEN_TELEGRAM;
const bot = new TelegramBot(token, { polling: true });

app.use(express.json());

// Endpoint for send message
app.post('/send-message', (req, res) => {
    const chatId = req.body?.chatId || defaultChatID;
    const message = req.body.message;

    console.log(`Chat ID: ${chatId}`);

    bot.sendMessage(chatId, message)
        .then(() => {
            res.status(200).send('Message sent successfully');
        })
        .catch(error => {
            console.error(`Error sending message: ${error}`);
            res.status(500).send(`Error sending message: ${error.message} @fandu139`);
        });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});


