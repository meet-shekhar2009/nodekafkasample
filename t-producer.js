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

        const producer = kafka.producer({
            maxInFlightRequests: 1, idempotent: true, transactionalId: 'transid-' + Math.random() * 1000000, transactionTimeout: 1500
        });
        console.log("creating transaction.....")
        const transaction = await producer.transaction();
        console.log("transation created !")
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
        console.log('data sending..');
        const result = await transaction.send(sendobj);
        console.log('data sent!');
        await transaction.commit()
        console.log(`Send Successfully! ${JSON.stringify(result)}`)
        await producer.disconnect();
    }
    catch (ex) {
        console.error(`Something bad happened ${ex}`)
    }
    finally {
        process.exit(0);
    }


}