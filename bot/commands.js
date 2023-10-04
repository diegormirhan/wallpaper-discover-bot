// Import the bot instance
const { bot } = require('./telegram');

// Import the unsplash api requests
const { landscapeRandom } = require('../api/landscape-random');
const { portraitRandom } = require('../api/portrait-random');
const { queryOptions } = require('../api/query-options');
const { querySearch } = require('../api/query-search');

// Import the bot updates request from mongodb
const { userUpdates } = require('./bot-updates')

// Import the user id request to mongodb
const { getUserId } = require('./get-userId');

// Create a /start command
bot.onText(/\/start/, function startCommand(msg) {
    const chatId = msg.chat.id
    const message = "*Welcome to the Wallpaper Discover Bot.*\nYou can easily discover millions of wallpapers from unsplash for free and using this bot. Enjoy! :)"
    getUserId(msg, chatId)
    bot.sendMessage(chatId, message, {parse_mode: 'markdown'})
})

// Create a /help command
bot.onText(/\/help/, function helpCommand(msg) {
    const chatId = msg.chat.id
    const message = "test"
    bot.sendMessage(chatId, message, {parse_mode: 'Markdown'})
})

// Create a /portrait-random command
bot.onText(/\/portrait-random/, function portraitRandomCommand(msg) {
    const chatId = msg.chat.id
    portraitRandom(bot, chatId)
})

// Create a /landscape-random command
bot.onText(/\/landscape-random/, function landscapeRandomCommand(msg) {
    const chatId = msg.chat.id
    landscapeRandom(bot, chatId)
})

// Create a /query-options command
bot.onText(/\/query-option/, function queryOptionsCommand(msg) {
    const chatId = msg.chat.id
    queryOptions(bot, chatId)
})

// Create a /query-search command
bot.onText(/\/query-search/, function querySearchCommand(msg) {
    const chatId = msg.chat.id
    querySearch(bot, chatId)
})

// Create a /update command
bot.onText(/\/update/, function updateCommand(msg) {
    const chatId = msg.chat.id
    const adminId = process.env.ADMIN_ID
    if (adminId == chatId) {
        userUpdates(bot, chatId);
    } else {
        bot.sendMessage(chatId, "*You don't have permission to use this command!*")
    }
    chatUpdate(bot, chatId);
})

