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

    const topic = ['home/sembrio1/humidity', 'home/sembrio1/temperature','home/sembrio1/humeditySolid'];
    const topic1 = 'home/pruebaLed';
    const topicLed = "cmd";

   /*const topi1='home/sembrio1/humidity';
   const topi2='home/sembrio1/temperature';
   const topi3='home/sembrio1/humeditySolid';*/

/**
 * Activar el evento de Connect para realizar la coneccion  se puede reslizar acciones
 * como suscripcion o publicador sismpre que se active el evento
 */
connectClient.on('connect', ()=>{
    console.log('Conectado');
    /**
     * Suscriptor puede recivir varios topic
     */
    connectClient.subscribe(topic, ()=>{
        console.log(`Subcripción al topic ${topic}`);
    })

    /**
     * Metodo para publicar
     * nombre del tema y el mensaje son campos obligatorios
     */
    /*connectClient.publish(topicLed, '1', {qos: 0, retain:false},(error)=>{
        if (error){
            console.log(error)
        }
    })*/
})

connectClient.on('message', (topic,payload)=>{
    console.log("Mensaje Recibido " + topic + " Valor "+ payload);

})


