const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema(
    {
        day: {type: Date, default: ()=>new Date()},
        exercises:[
            { 
                type:{
                    type:String,
                    trim:true,
                    required:"Enter exercise type "
                } ,
                name:{
                    type:String,
                    trim:true,
                    required:"Enter exercise name"
                } ,
               
                duration: {
                    type: Number,
                },
                weight: {
                    type: Number,
                },
                repetitions: {
                    type: Number,
                }, 
                sets: {
                    type: Number,
                },
                distance: {
                    type: Number
                }
            }
        ]       
    });

const Workout = mongoose.model("workouts", WorkoutSchema);

module.exports = Workout;
