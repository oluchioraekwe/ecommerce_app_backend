const mongoose = require('mongoose');

const mongoAtlasUri = process.env.MONGO_ATLAS_URL;

function run() {
    try {
        // Connect to the MongoDB cluster
        mongoose.connect(
            mongoAtlasUri,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true,
                useFindAndModify: false
            },

            () => console.log('Mongoose Atlas is connected remotely')
        );
    } catch (e) {
        console.log('could not connect');
    }
}

module.exports = run;
