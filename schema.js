const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema(
    {
        day: {type: Date, default: Date.now},
        exercises:[
            { 
                type: String,
                name: String,
                duration: Number,
                weight: Number,
                repetitions: Number,
                sets: Number,
                distance: Number
            }
        ]       
    });

const Workout = mongoose.model("workout", WorkoutSchema);

module.exports = Workout;
