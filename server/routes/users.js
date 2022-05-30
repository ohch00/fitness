const router = require('express').Router();
let User = require('../models/user.model');

router.route('/').get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const username = req.body.username;

  const newUser = new User({username});

  newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  User.findOneAndUpdate({username: req.params.id}, {
     $push: {
      plannedWorkouts : req.body.id
    }
  })
.then(() => res.json('User - Workouts updated!'))
.catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;