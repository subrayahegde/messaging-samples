import { Kafka } from "kafkajs"

const kafka = new Kafka({
 clientId: "my-consumer",
 brokers: ["localhost:9092"],
 // dont log anything
 logLevel: 0,
})

const consumer = kafka.consumer({ groupId: "my-group" })

const consume = async () => {
 await consumer.connect()
 await consumer.subscribe({ topic: "my-topic", fromBeginning: true })

 await consumer.run({
  eachMessage: async ({ topic, partition, message }) => {
   console.log({
    value: message.value.toString(),
   })
  },
 })
}

// start consuming
consume().catch(console.error)
