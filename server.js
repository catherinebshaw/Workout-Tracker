const express = require('express');
const mongoose = require("mongoose");
const path = require('path')
const Workouts = require('./models/workout_model');
const PORT = process.env.PORT || 3000;
const app = express();

const db = mongoose.connection

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (){
    console.log('connected!')
});

mongoose.connect( "mongodb://localhost/workout", { useNewUrlParser: true, useUnifiedTopology: true });
// process.env.MONGODB_URI ||


app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + "./public/index.html"));
  });
  app.get("/exercises", (req, res) => {
    res.sendFile(path.join(__dirname + "./public/exercises.html"));
  });

// GET - retrieve data for the last workout  
app.get("/api/workouts", (req, res) => {

    Workouts.aggregate([
        {
            $addFields: {
                totalDuration: {
                    $sum: "$exercises.duration",
                },
            },
        }
    ])
    
    .then((dbWorkouts) => {
        console.log(`[SUM]`, dbWorkouts);
        res.json(dbWorkouts);
        })
        .catch((err) => {
            res.json(err);
        }
    )
})

app.put("/api/workouts/:id", async (req,res) => {
    try{
        var updateWorkout = await Workouts.update( 
        {_id: mongojs.ObjectID(params.id)},
        {$set: { day: Date.now} });
        
        var result = updateWorkout.save()
        
        console.log('[PUT]', result);
        response.send(result);
    } catch (error) {
        response.status(500).send(error);
    }
});

app.post("/api/workouts", async(req,res) => {
    try {
    var data = request.body
    var newExercise = new Workouts.insert(data);
    var result = await newExercise.save();
    console.log('[POST]', result)
    } catch (error) {
        response.status(500).send(error);
    }
});

app.get('/api/workouts/range'), (req,res) => {
    Workouts.aggregate(
        {
            $addFields: {
                totalDuration: {
                    $sum: "$exercises.duration",
                },
            },
        }
    )
    .sort({ _id: -1 })
    .limit(7)
    .then((dbWorkouts) => {
        console.log(`[SUM]`, dbWorkouts);
        res.json(dbWorkouts);
        })
        .catch((err) => {
            res.json(err);
        }
    )

}

app.listen(3000, () => {
    console.log("App running on port 3000!");
  });