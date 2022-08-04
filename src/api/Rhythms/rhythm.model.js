const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    name: { type: String, unique: true, required: true },
    image: { type: String, required: true },
    description: { type: String, required: true },
    compositions: [{ type: Schema.Types.ObjectId, ref: "compositions" }],
},
    {
        timestamps: true
    }
);

module.exports = mongoose.model('rhythms', schema);