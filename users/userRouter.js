const express = require('express');

const router = express.Router();
const Users = require("./userDb.js")

router.post('/', (req, res) => {
  Users.insert(req.body)
  .then(newUser => {
    res.status(200).json(newUser);
  })
}); //working

router.post('/:id/posts', (req, res) => {
  const newPost = req.body
  Users.insert(req.params.id, newPost)
  .then(post => {
    res.status(200).json(post)
  })
}); //still needs work

router.get('/', (req, res) => {
  Users.get(req.query)
  .then(users => {
    res.status(200).json(users)
  })
}); //working

router.get('/:id', (req, res) => {
  Users.getById(req.params.id)
  .then(user => {
    res.status(200).json(user)
  })
}); //working

router.get('/:id/posts', (req, res) => {
  Users.getUserPosts(req.params.id)
  .then(post => {
    res.status(200).json(post);
  })
}); //working

router.delete('/:id', (req, res) => {
  Users.getById(req.params.id)
  .then(user => {
    Users.remove(req.params.id)
    .then(() => {
      res.status(200).json(user);
    })
  })
}); //working

router.put('/:id', (req, res) => {
  const changes = req.body;
  Users.update(req.params.id, changes)
  .then(() => {
    res.status(200).json(changes)
  })
}); //working

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
}

function validateUser(req, res, next) {
  // do your magic!
}

function validatePost(req, res, next) {
  // do your magic!
}

module.exports = router;
