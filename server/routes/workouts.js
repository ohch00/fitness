const router = require('express').Router();
const { async } = require('@firebase/util');
let Workout = require('../models/workout.model');

async function deleteAll(){
  await Workout.deleteMany({});
}


router.route('/').get((req, res) => {
  Workout.find()
    .then(workout => res.json(workout))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const user = req.body.user;
  const exercise = req.body.exercise;
  const reps = Number(req.body.reps);
  const sets = Number(req.body.sets);
  const duration = Number(req.body.duration);
  const date = Date.parse(req.body.date);
  const finished = req.body.finished;

  //deleteAll();

  const newWorkout = new Workout({
      user,
      exercise,
      reps,
      sets,
      duration,
      date,
      finished
      
    });

    newWorkout.save(function (err, result) {
      res.json(result._id);

      if (err) {
        res.status(400).json('Error: ' + err);
      }
    })
  })


router.route('/:id').get((req, res) => {
  Workout.findById(req.params.id)
    .then(workout => res.json(workout))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Workout.findByIdAndDelete(req.params.id)
    .then(() => res.json('Workout deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  Workout.findById(req.params.id)
    .then(workout => {
        workout.exercise = req.body.exercise;
        workout.reps = Number(req.body.reps);
        workout.sets = Number(req.body.sets);
        workout.duration = Number(req.body.duration);
        workout.date = Date.parse(req.body.date);
        workout.finished = req.body.finished;


      workout.save()
        .then(() => res.json('User updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;