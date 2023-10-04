require('dotenv').config();
const { telegramChatsCol} = require('../database/mongodb');

const userUpdates = async (bot, chatId) => {
    try {
        const documents = await telegramChatsCol.find({}).toArray();
        const reply_markup = {
            force_reply: true,
            selective: true
        }
        bot.sendMessage(chatId, '*Please enter the admin password:*', {parse_mode: 'Markdown', reply_markup: reply_markup})

        bot.once('message', (msg) => {
            const adminPassword = process.env.ADMIN_PASSWORD

            if (adminPassword === msg.text && msg.reply_to_message) {
                bot.sendMessage(chatId, '*Admin sucess authorized!*\nType the message you want to send to the users below:', {parse_mode: 'Markdown', reply_markup: reply_markup})
                bot.once('message', (msg) => {
                    if (msg.reply_to_message) {
                        documents.forEach((doc) => {
                            bot.sendMessage(doc.id, msg.text, {parse_mode: 'Markdown'})
                        })
                        bot.sendMessage(chatId, '*The message was sent successfully to the users!*', {parse_mode: 'Markdown'})
                    } else {
                        bot.sendMessage(chatId, '*Operation Denied!*', {parse_mode: 'Markdown'})
                    }
                })
            } else if (!msg.reply_to_message) {
                bot.sendMessage(chatId, '*Operation denied!*', {parse_mode: 'Markdown'})
            } else {
                bot.sendMessage(chatId, '*Wrong password!*', {parse_mode: 'Markdown'})
            }
        })
    } catch (error) {
        bot.sendMessage(chatId, `*There was an error trying to run the operation. Try again later!\nError Message: ${error.message}*`)
    }
}

module.exports = {
    userUpdates
}