const express = require('express');
const mongoose = require("mongoose");
const path = require('path');
const Workout = require('./models/workout_model');
const PORT = process.env.PORT || 3000;
var app = express();


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));


mongoose.connect(
    process.env.MONGODB_URI || 'mongodb://localhost/deep-thoughts',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    }
  );


// html routes
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + "./public/index.html"));
  });
  
app.get("/exercise", (req, res) => {
    res.sendFile(path.join(__dirname + "/public/exercise.html"));
  });
  
  app.get("/stats", (req, res) => {
    res.sendFile(path.join(__dirname + "/public/stats.html"));
  });



//api routes

// GET - retrieve data for the last workout  
app.get("/api/workouts", (req, res) => {

    Workout.aggregate([
        {
            $addFields: {
                totalDuration: {
                    $sum: "$exercises.duration",
                },
            },
        }
    ])
    
    .then((Workout) => {
        console.log(`[GET]`, Workout);
        res.json(Workout);
        })
        .catch((err) => {
            res.json(err);
        }
    )
})

app.put("/api/workouts/:id", async (req,res) => {
    try{
        var updateWorkout = await Workout.findByIdAndUpdate( 
        {_id: req.params.id},
        {$push: { exercises:req.body}});
        
        res.json(updateWorkout)
        
        
    } catch (error) {
        console.log(error);
    }
});

app.post("/api/workouts", (req, res) => {

   Workout.create({})
    .then(dbWorkout => {
        res.json(dbWorkout)
    })
    .catch (error => {
        console.log(error);
    })
});

app.get("/api/workouts/range", (req,res) => {
    Workout.aggregate([
        {
            $addFields: {
                totalDuration: {
                    $sum: "$exercises.duration",
                },
            },
        }
    ])
    .sort({ _id: -1 })
    .limit(7)
    .then((Workout) => {
        console.log(`[SUM]`, Workout);
        res.json(Workout);
        })
        .catch((err) => {
            res.json(err);
        }
    )

})

app.listen(3000, () => {
    console.log("App running on http://localhost:3000");
  });