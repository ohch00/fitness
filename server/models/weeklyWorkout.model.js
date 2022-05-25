const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const weeklyWorkoutSchema = new Schema({
    
},
{
    timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;