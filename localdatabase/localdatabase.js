const mongoose = require('mongoose');

const url = process.env.MONGO_URL;
function run() {
    try {
        // Connect to the MongoDB cluster
        mongoose.connect(
            url,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true,
                useFindAndModify: false
            },

            () => console.log('Mongoose is connected locally')
        );
    } catch (e) {
        console.log('could not connect');
    }
}

module.exports = run;
