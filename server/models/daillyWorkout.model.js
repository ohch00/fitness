const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const dailyWorkoutSchema = new Schema({
    exercise: { type: Schema.Types.ObjectId, ref: 'Exercise', required: true },
    reps: { type: Number },
    sets: { type: Number },
    duration: { type: Number },
    date: { type: Date, required: true },
    finished: { type: Boolean }

},
{
    timestamps: true,
});

const dailyWorkout = mongoose.model('Daily', dailyWorkoutSchema);

module.exports = dailyWorkout;