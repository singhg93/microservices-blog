var amqp = require('amqplib/callback_api');
var sendEmail = require('./sendEmail.js');

amqp.connect('amqp://message_queue', function (error0, connection) {
    if (error0) {
        throw error0;
    }

    connection.createChannel(function(error1, channel) {
        if (error1) {
            throw error1;
        }

        var exchange = 'email_verify';

        channel.assertExchange(exchange, 'direct', {
            durable: false
        });

        channel.assertQueue('account_verification', {
            durable: true,
            exclusive: true
        }, function(error2, q) {
            if (error2) {
                throw error2;
            }

            console.log(" [*] Waiting for messages in %s.", q.queue);
            channel.bindQueue(q.queue, exchange, 'account_verification');

            channel.consume(q.queue, function(msg) {
                if(msg.content) {
                    data = JSON.parse(msg.content.toString());
                    console.log(data);
                    sendEmail(data.subject, data.body, data.recipient);
                    channel.ack(msg);
                }
            }, {
                noAck: false
            });
        });
    });
})
