const express = require('express');
const mongoose = require("mongoose");
const path = require('path')

const PORT = process.env.PORT || 3000;
const app = express();

const db = mongoose.connection

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", { useNewUrlParser: true, useUnifiedTopology: true });
const Workout = require('schema');

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (){
    console.log('connected!')
});

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + "./public/index.html"));
  });
  
app.get("/api/workouts", (req, res) =>{
    db.getLastWorkout()
    res.redirect('index')
  });