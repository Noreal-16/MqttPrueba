const config = {};

config.debug = process.env.DEBUG || false;

config.mqtt = {};
config.mqtt.topic = process.env.TOPIC || ['home/sembrio1/humidity', 'home/sembrio1/temperature','home/sembrio1/humeditySolid'];
config.mqtt.hostname = process.env.HOSTNAME || '192.168.100.30';
config.mqtt.port = process.env.PORT || '1883';
config.mqtt.username = process.env.USERNAME || 'riego';
config.mqtt.password = process.env.PASSWORD || '3435';
config.mqtt.cafile = process.env.MQTT_CAFILE    || 'mqtt-ca.pem';

config.mongodb = {};
config.mongodb.hostname = process.env.MONGODB_HOSTNAME || 'localhost';
config.mongodb.port = process.env.PORT || '27017';
config.mongodb.database = process.env.DATABASE || 'mqtt';
config.mongodb.collection = process.env.COLLECTION || 'message';

module.exports = config;