//const Kafka = require("kafkajs").Kafka
const { Kafka } = require("kafkajs")
const provider = require("./provider");

run();
async function run() {
    try {
        const kafka = new Kafka({
            "clientId": "myapp",
            "brokers": ["40.82.215.148:9092"]
        })

        const consumer = kafka.consumer({ "groupId": "test-1" })
        console.log("Connecting.....")
        await consumer.connect()
        console.log("Connected!")

        await consumer.subscribe({
            topic: "izor3",
            fromBeginning: true
        })

        await consumer.run({
            eachMessage: async result => {
                try {
                    await provider.set({
                        value: result.message.value.toString(),
                        updatedon: new Date()
                    });

                } catch (error) {
                    console.error(error.message);
                }
                finally {
                    console.log(`RVD Msg ${result.message.value} on partition ${result.partition}`);
                }

            }
        })
    }
    catch (ex) {
        console.error(`Something bad happened ${ex}`)
    }
    finally {

    }


}