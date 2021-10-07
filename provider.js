var mongoose = require('mongoose');
let Schema = mongoose.Schema;
const myevents = mongoose.model('myevents', new Schema({ value: String, updatedon: Date }));
console.log('connecting mongo...');
mongoose.connect('mongodb://20.193.225.199:27017/sample');

module.exports = (function () {
    return {
        get: async function (value) {
            return await myevents.find({});
        },
        set: async function (value) {
            try {
                await myevents.create(value);
            } catch (error) {
                console.log(error);
                throw error;
            }

        }
    }
})();