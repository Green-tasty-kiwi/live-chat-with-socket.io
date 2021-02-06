module.exports = ({ chatsGateway }) =>
    async (request, response) => {
        const chat = await chatsGateway.findByPk(request.params.chatId)

        response.send(chat);
    }