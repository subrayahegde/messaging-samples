namespace Producer.RabitMQ {
    public interface IRabitMQProducer {
        public void SendProductMessage < T > (T message);
    }
}