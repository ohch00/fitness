const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const dailyWorkoutSchema = new Schema({
    exercise: { type: Schema.Types.ObjectId, ref: 'Exercise', required: true },
    reps: { type: Number, required: true },
    sets: { type: Number, required: true },
    date: { type: Date, required: true },
    finished: { type: Boolean, required: false }

},
{
    timestamps: true,
});

const dailyWorkout = mongoose.model('Daily', dailyWorkoutSchema);

module.exports = dailyWorkout;