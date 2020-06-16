import pika
import json

def send_verification_email(token, recipient, user_id):
    # create the connection to ther rabbitmq server
    connection = pika.BlockingConnection(pika.ConnectionParameters('message_queue'))
    # create a channel
    channel = connection.channel()

    # the message to be sent
    message = {
        "subject": "Verify your email",
        "body": "Please verify your email by clicking on the following link: http://localhost:5000/verify/" + token,
        "recipient": recipient
    }

    # declare an direct exchange to send messages to the email verification queue
    channel.exchange_declare(
        exchange='email_verify',
        exchange_type='direct'
    )

    # channel.queue_declare(queue='account_verification')
    # publish the message to the exchange with the queue name as the routing key
    channel.basic_publish(
        exchange='email_verify',
        routing_key='account_verification',
        body=json.dumps(message),
        properties=pika.BasicProperties(
            delivery_mode=2,  # make message persistent
        ))
    connection.close()
