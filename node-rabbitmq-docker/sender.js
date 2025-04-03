/* Sender */

const uuidv1 = require('uuid/v1');
var amqp = require('amqplib/callback_api');

function producer (){
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
        var message = "Hello World " +  uuidv1();
        ch.assertQueue(queue, {durable: false});
        ch.sendToQueue(queue, Buffer.from(message));
        console.log(" [x] Sent %s", message);
      });
      setTimeout(function() { conn.close(); process.exit(0) }, 500);
  });
}

// This is Async call - low show before
producer();
console.log("Please wait, I'm sending message,...")
