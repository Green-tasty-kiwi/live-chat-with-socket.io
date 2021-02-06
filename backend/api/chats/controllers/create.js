module.exports = ({ chatsGateway }) =>
    async (request, response) => {
        const chat = await chatsGateway.create(request.body.name);

        response.send(chat);
    }