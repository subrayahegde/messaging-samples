import kafka
import json

RIDES_CONFIRMED_KAFKA_TOPIC = "ride_confirmed"
consumer = kafka.KafkaConsumer(
    RIDES_CONFIRMED_KAFKA_TOPIC, bootstrap_servers="localhost:9092"
)

print("Listening Confirmed Rides!")
while True:
    for data in consumer:
        message = json.loads(data.value.decode())
        email = message["customer_email"]
        print(f"Email sent to {email}!")
