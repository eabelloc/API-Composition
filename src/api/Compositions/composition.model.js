const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    name: { type: String, unique: true, required: true },
    image: { type: String, required: true },
    description: { type: String, required: true },
    chords: [{ type: Schema.Types.ObjectId, ref: "chords" }],
    rhythms: [{ type: Schema.Types.ObjectId, ref: "rhythms" }],
    melodies: [{ type: Schema.Types.ObjectId, ref: "melodies" }],
},
    {
        timestamps: true
    }
);

module.exports = mongoose.model('compositions', schema);