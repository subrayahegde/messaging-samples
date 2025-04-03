import json
import kafka
import random

RIDE_DETAILS_KAFKA_TOPIC = "ride_details"
RIDES_CONFIRMED_KAFKA_TOPIC = "ride_confirmed"

consumer = kafka.KafkaConsumer(
    RIDE_DETAILS_KAFKA_TOPIC, bootstrap_servers="localhost:9092"
)
producer = kafka.KafkaProducer(bootstrap_servers="localhost:9092")

print("Listening Ride Details")
while True:
    for data in consumer:
        print("Loading Transaction..")
        message = json.loads(data.value.decode())
        customer_id = message["customer_id"]
        location = message["location"]
        confirmed_ride = {
            "customer_id": customer_id,
            "customer_email": f"{customer_id}@xyz.com",
            "location": location,
            "alloted_driver": f"driver_{customer_id}",
            "pickup_time": f"{random.randint(1, 20)}mins",
        }
        print(f"Transaction Completed..({customer_id})")
        producer.send(
            RIDES_CONFIRMED_KAFKA_TOPIC, json.dumps(confirmed_ride).encode("utf-8")
        )
