const { telegramChatsCol} = require('../database/mongodb');

const getUserId = async (msg, chatId) => {
    try {
        const formattedDate = new Date().toLocaleString('pt-BR', {
            timeZone: 'America/Sao_Paulo',
            timeZoneName: 'short',
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })

        const doc = {
            id: chatId,
            username: msg.from.first_name,
            cratedAt: formattedDate
        }
        
        const existingDoc = await telegramChatsCol.findOne({id: chatId});

        if (!existingDoc) {
            await telegramChatsCol.insertOne(doc)
            console.log(`A document was inserted with the id: ${doc.id}`)
        } else {
            console.log('The chatID is already on the database!')
        }
    } catch (error) {
        console.log('There was an error trying to insert the chat Id into the database.\nError Message:', error);
    }
}

module.exports = {
    getUserId
}