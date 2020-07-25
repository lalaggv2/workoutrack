const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let workoutSchema = new Schema(
  {
    day: { type: Date, default: Date.now },
    exercises: [{
      type: { type: String, required: true },
      name: { type: String, required: true },
      distance: Number,
      duration: Number,
      weight: Number,
      reps: Number,
      sets: Number
    }]
  },
  //add duration calculation
  {
    toJSON: {
      virtuals: true
    }
  },
  //stop version coming up in JSON
  {
    versionKey: false
  }
);

//fix duration not calcultaing
workoutSchema.virtual("totalDuration").get(function () {
  // tally up sum of durations. set default to 0
  return this.exercises.reduce((total, exercise) => {
    return total + exercise.duration;
  }, 0);
});

var Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;