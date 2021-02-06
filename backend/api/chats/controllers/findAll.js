module.exports = ({ chatsGateway }) =>
    async (request, response) => {
        const chats = await chatsGateway.findAll();

        response.send(chats);
    }