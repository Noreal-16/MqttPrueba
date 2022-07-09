const mqtt = require('mqtt');
const dir_Ip_Broker = '192.168.100.30';
const port = '1883';
const client = (`mqtt://${dir_Ip_Broker}:${port}`);
const clientId = `mqtt_${Math.random().toString(16).slice(3)}`

const connectClient = mqtt.connect(client, {
    clientId,
    clean: true,
    connectTimeout:4000,
    username:'riego',
    password:'3435',
    reconnectPeriod:1000,
})


const topic1 = 'home/pruebaLed';

connectClient.on('connect', ()=>{
    console.log('Conectado');
    connectClient.publish(topic1, 'on', {qos: 0, retain:false},(error)=>{
        if (error){
            console.log(error)
        }
    })
})



