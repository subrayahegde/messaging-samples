import kafka
import json

RIDES_CONFIRMED_KAFKA_TOPIC = "ride_confirmed"
consumer = kafka.KafkaConsumer(
    RIDES_CONFIRMED_KAFKA_TOPIC, bootstrap_servers="localhost:9092"
)

print("Listening Confirmed Rides !")
while True:
    for data in consumer:
        message = json.loads(data.value.decode())
        id = message["customer_id"]
        driver_details = message["alloted_driver"]
        pickup_time = message["pickup_time"]
        print(f"Data sent to ML Model for analysis ({id})!")
