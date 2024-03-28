async function routes(fastify, options) {

    fastify.get('/:id', async (req, res) => {
        res.send({
            id: req.params.id,
            firstName: "John",
            lastName: "Doe",
            age: 30,
            email: "<EMAIL>",
            password: "<PASSWORD>"
        })
    })
}

module.exports = routes