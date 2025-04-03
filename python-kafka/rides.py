import kafka
import json
import time
import random

topicName = "ride_details"
producer = kafka.KafkaProducer(bootstrap_servers="localhost:9092")

for i in range(1, 10):
    ride = {
        "id": i,
        "customer_id": f"user_{i}",
        "location": f"Lat: {random.randint(-90, 90)}, Long: {random.randint(-90, 90)}",
    }
    producer.send(topicName, json.dumps(ride).encode("utf-8"))
    print(f"Ride Details Send Succesfully!")
    time.sleep(5)
