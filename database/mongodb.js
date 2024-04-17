require('dotenv').config()
const MongoClient = require('mongodb').MongoClient;

// Getting the database url
const url = process.env.DATABASE_URL 

// Connecting to the database
const client = new MongoClient(url);

// Connecting to the "chats" databse.
const chatsDatabase = client.db('chats')

// Connecting to the "telegram chats" collection
const telegramChatsCol = chatsDatabase.collection('telegram-chats')

module.exports = {
    client,
    chatsDatabase,
    telegramChatsCol
}
