const amqp = require('amqplib');
const { v4: uuidv4 } = require('uuid');

// setup queue name
const queueName = 'test-queue';

/**
 * Send message
 */
async function send() {
  // connect to RabbitMQ
 // console.log(process.env.RABBITMQ_HOST);
  
  const connection = await amqp.connect('amqps://admin:password@b-416a84db-2292-40cb-9eb2-0b954521a71f.mq.ap-south-1.amazonaws.com:5671');
  // create a channel
  const channel = await connection.createChannel();
  // create/update a queue to make sure the queue is exist
  await channel.assertQueue(queueName, {
    durable: true,
  });
  // generate correlation id, basically correlation id used to know if the message is still related with another message
  const correlationId = uuidv4();
  // send 10 messages and generate message id for each messages
  for (let i = 1; i <= 10; i++) {
    const buff = Buffer.from(JSON.stringify({
      test: `Hello World ${i}!!`
    }), 'utf-8');
    const result = channel.sendToQueue(queueName, buff, {
      persistent: true,
      messageId: uuidv4(),
      correlationId: correlationId,
    });
    console.log(result);
  }
  // close the channel
  await channel.close();
  // close the connection
  await connection.close();
}

send();
