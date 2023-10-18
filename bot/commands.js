// Import the bot instance
const { bot } = require('./telegram');

// Import the unsplash api requests
const { landscapeRandomReq } = require('../api/landscape-random');
const { portraitRandomReq } = require('../api/portrait-random');
const { queryOptions } = require('../api/query-options');
const { querySearch } = require('../api/query-search');

// Import the bot updates request from mongodb
const { userUpdates } = require('./bot-updates')

// Import the user id request to mongodb
const { getUserId } = require('./get-userId');

// Command Handlers
const commandHandlers = {
    '/landscape_random': landscapeRandomReq,
    '/portrait_random': portraitRandomReq,
    '/query_option': queryOptions,
    '/query_search': querySearch,
};

// Create the commands
bot.onText(/\/start/, startCommand)
bot.onText(/\/help/, helpCommand)
bot.onText(/\/portrait_random/, portraitRandomCommand)
bot.onText(/\/landscape_random/, landscapeRandomCommand)
bot.onText(/\/query_option/, queryOptionsCommand)
bot.onText(/\/query_search/, querySearchCommand)
bot.onText(/\/update/, updateCommand)


// Functions to create commands

// --- /start command ---
function startCommand(msg) {
    const chatId = msg.chat.id
    const message = "*Welcome to the Wallpaper Discover Bot.*\nYou can easily discover millions of wallpapers from unsplash for free and using this bot. Enjoy! :)"
    getUserId(msg, chatId)
    const options = {
        parse_mode: 'markdown',
        reply_markup: {
            inline_keyboard: [
                [
                    { text: 'Landscape Random', callback_data: '/landscape_random' },
                    { text: 'Portrait Random', callback_data: '/portrait_random' }
                ],
                [
                    { text: 'Query Options', callback_data: '/query_option' },
                    { text: 'Query Search', callback_data: '/query_search' }
                ],
                [
                    { text: 'Help', callback_data: '/help' }
                ]
            ]
        }
    }
    bot.sendMessage(chatId, message, options)
}

// --- /help command ---
function helpCommand(msg) {
    const chatId = msg.chat.id
    const message = "Under development..."
    bot.sendMessage(chatId, message, { parse_mode: 'Markdown' })
}

// --- /portrait_random command ---
function portraitRandomCommand(msg) {
    const chatId = msg.chat.id
    portraitRandomReq(bot, chatId)
}

// --- /lascape_random command ---
function landscapeRandomCommand(msg) {
    const chatId = msg.chat.id
    bot.sendMessage(chatId, 'Under development...')
    landscapeRandomReq(bot, chatId)
}

// --- /query_options command ---
function queryOptionsCommand(msg) {
    const chatId = msg.chat.id
    bot.sendMessage(chatId, 'Under development...')
    // queryOptions(bot, chatId)
}

// --- /query_search command ---
function querySearchCommand(msg) {
    const chatId = msg.chat.id
    bot.sendMessage(chatId, 'Under development...')
    querySearch(bot, chatId)
}

// --- /update command ---
function updateCommand(msg) {
    const chatId = msg.chat.id
    const adminId = process.env.ADMIN_ID
    if (adminId == chatId) {
        userUpdates(bot, chatId);
    } else {
        bot.sendMessage(chatId, "*You don't have permission to use this command!*")
    }
    chatUpdate(bot, chatId);
}


// Callback function for the update events
bot.on('callback_query', (callbackQuery) => {
    const msg = callbackQuery.message;
    const data = callbackQuery.data;
    bot.answerCallbackQuery(callbackQuery.id);
    if(commandHandlers[data]) {
        commandHandlers[data](bot, msg.chat.id);
    } else if (data === '/help') {
        helpCommand(msg);
    }
});
