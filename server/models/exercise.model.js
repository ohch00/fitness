const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const exerciseSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: false },
    reference: { type: String, required: false},
    workouts: [{type: Schema.Types.ObjectId, ref: 'Workout'}]
},
{
    timestamps: true,
});

const Exercise = mongoose.model('Exercise', exerciseSchema);

module.exports = Exercise;