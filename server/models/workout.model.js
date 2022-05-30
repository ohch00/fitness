const mongoose = require('mongoose');

const Schema = mongoose.Schema;

var ExerciseSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: false },
    reference: { type: String, required: false},
})

const dailyWorkoutSchema = new Schema({
    user: { type: String },
    exercise: { type: ExerciseSchema },
    reps: { type: Number },
    sets: { type: Number },
    duration: { type: Number },
    date: { type: Date, required: true },
    finished: { type: Boolean }

},
{
    timestamps: true,
});

const Workout = mongoose.model('Workout', dailyWorkoutSchema);

module.exports = Workout;