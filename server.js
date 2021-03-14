const { ObjectID } = require('bson');
const express = require('express');
const mongoose = require("mongoose");
const path = require('path')

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));


const db = mongoose.connection

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", { useNewUrlParser: true, useUnifiedTopology: true });
const Workouts = require('./schema');

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (){
    console.log('connected!')
});

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + "./public/index.html"));
  });
  
//GET - retrieve data for the last workout  
// app.get("/api/workouts", (req, res) => {
//    Workouts.find().sort({ day : -1 }).limit(1), (error, found) => {
//        if (error) {
//            console.log(error);
//            res.send(error)
//        } else {
//            console.log (found)
//            res.json (found)
//        }
//    }
// });

// app.put("/api/workouts/:id", (req,res) => {
//     Workouts.update( 
//         {_id: mongojs.ObjectID(params.id)},
//         {$set:
//         { day: Date.now}
//         },
//         (error, results) =>{
//             if (error) {
//                 console.log(error) 
//             } else {
//                 console.log('[PUT]', results)
//                 res.json(results)
//             }
//             });
// });

// app.post("/api/workouts", ({ body },res) => {
//     const newWorkout = body
//     Workouts.save( newWorkout, (error, updated) => {
//         if (error) {
//             console.log(error);
//           } else {
//             res.json(updated)
//           }  
//         }
//         )
//     });

// app.get('/api/workouts/range'), (req,res) => {
//     Workouts.aggregate(
//         {
//             $addFields: {
//                 totalDuration: {
//                     $sum: "$exercises.duration",
//                 },
//             },
//         }
//     )
//     .sort({ _id: -1 })
//     .limit(7)
//     .then((dbWorkouts) => {
//         console.log(`[SUM]`, dbWorkouts);
//         res.json(dbWorkouts);
//         })
//         .catch((err) => {
//             res.json(err);
//         }
//     )

// }

app.listen(3000, () => {
    console.log("App running on port 3000!");
  });