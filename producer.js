//const Kafka = require("kafkajs").Kafka
const { Kafka, CompressionTypes } = require("kafkajs")
const msg = process.argv[2];
run();
async function run() {
    console.log('initiated');
    try {
        const kafka = new Kafka({
            "clientId": "myapp",
            "brokers": ["40.82.215.148:9092"]
        })

        const producer = kafka.producer({ maxInFlightRequests: 1, idempotent: true });
        console.log("Connecting.....")
        await producer.connect()
        console.log("Connected!")
        //A-M 0 , N-Z 1 
        //  const partition = msg[0] < "N" ? 0 : 1;
        let sendobj = {
            topic: "izor3",
            compression: CompressionTypes.GZIP,
            messages: [
                {
                    "value": msg,
                    //key: 'par-hello'
                    //"partition": partition
                }
            ]
        };

        const result = await producer.send(sendobj)

        console.log(`Send Successfully! ${JSON.stringify(result)}`)
        await producer.disconnect();
    }
    catch (ex) {
        console.error(`Something bad happened ${ex.messages}`)
    }
    finally {
        process.exit(0);
    }


}