require('dotenv').config()
const TelegramBot = require('node-telegram-bot-api')

// Telegram Bot Token
const token = process.env.TELEGRAM_API

// Declaring the bot
const bot = new TelegramBot(token, {polling: true});

// Exporting the instance
module.exports = {
    bot
}