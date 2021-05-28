const mongoose = require('mongoose');

const RecordSchema = mongoose.Schema({
    title: {
        type: String
    },
    uri: {
        type: String
    },
    date: {
        type: String
    }
});

const Record = mongoose.model('record', RecordSchema);
export default Record;