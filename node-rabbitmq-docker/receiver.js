/* Receiver */

var amqp = require('amqplib/callback_api');


function consumer () {
  amqp.connect('amqp://admin:admin@localhost:5672', function(err, conn) {
  if (err) {
    console.error("[AMQP] Error Create a connection", err.message);
    return setTimeout(function() {process.exit(0) }, 500);
  }
  conn.createChannel(function(err, ch) {
    if (err) {
      console.error("[AMQP] Error Create a Channel", err.message);
      return setTimeout(function() {process.exit(0) }, 500);
    }
    var queue = 'hello';
    ch.assertQueue(queue, {durable: false});
    console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);
    ch.consume(queue, function(msg) {
      console.log(" [x] Received %s", msg.content.toString());
    }, {noAck: true});
  });
 });
}

consumer();
