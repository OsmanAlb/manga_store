const fastify = require('fastify')();

fastify.register(require('./routes/users'), { prefix: '/users' });

fastify.listen(5000, function (err, address) {
    if (err) {
        fastify.log.error(err);
        process.exit(1);
    } else {
        console.log('Server is listening on port 5000');
    }
});