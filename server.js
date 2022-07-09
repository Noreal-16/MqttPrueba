const  mongodb = require('mongodb');
const configure = require('./config');
const  mqtt = require('mqtt');
const fs = require('fs');
const {MongoClient} = require("mongodb");

/**
 * Configuracion MQTT
 * @type {string}
 */
const clientMqtt = (`mqtt://${configure.mqtt.hostname}:${configure.mqtt.port}`);
const clientId = `mqtt_${Math.random().toString(16).slice(3)}`;

const client = mqtt.connect(clientMqtt, {
    clientId,
    clean: true,
    connectTimeout:4000,
    username:configure.mqtt.username,
    password:configure.mqtt.password,
    reconnectPeriod:1000,
});
client.on('connect', ()=>{
    console.log("Conectado");
})
client.subscribe(configure.mqtt.topic, ()=>{
    const [topic1, topic2, topic3] = configure.mqtt.topic;
    console.log(`Subcripción al topic ${topic1} : : ${topic2} : : ${topic3} `);
})



//let mqttUri = 'mqtt://' + configure.mqtt.hostname + ':' + configure.mqtt.port;
const mqttUri = `mqtt://${configure.mqtt.hostname}:${configure.mqtt.port}`;





//const mongoUri = 'mongodb://' +configure.mongodb.hostname + ':' + configure.mongodb.port + '/'+configure.mongodb.database;
const mongoUri = `mongodb://${configure.mongodb.hostname}:${configure.mongodb.port}/${configure.mongodb.database}`;

mongodb.MongoClient.connect(mongoUri,  (error, database)=>{
    if (error != null){
        throw error;
    }
    let collection = database.collection(configure.mongodb.collection);
    collection.createIndex({"topic":1 });

    client.on('message',(topic, payload)=>{
        console.log("Mensaje Recibido " + topic + " Valor "+ payload.toString());
        const messageMqtt ={
            topic: topic,
            message: payload.toString()
        }
        collection.insert(messageMqtt, (error, result)=>{
            if (error != null){
                console.log("ERROR" , error);
            }
        })
    })


})