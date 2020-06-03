const express = require('express');

const Posts = require("./postDb.js")

const router = express.Router();

router.get('/', (req, res) => {
  Posts.get(req.query)
  .then(posts => {
    res.status(200).json(posts)
  })
}); //working

router.get('/:id', (req, res) => {
  Posts.getById(req.params.id)
  .then(post => {
    res.status(200).json(post)
  })
}); //working

router.delete('/:id', (req, res) => {
  Posts.getById(req.params.id)
  .then(post => {
    Posts.remove(req.params.id)
    .then(() => {
      res.status(200).json(post)
    })
  })
}); //working

router.put('/:id', (req, res) => {
  const changes = req.body

  Posts.update(req.params.id, changes)
  .then(newPost => {
    console.log(newPost)
    res.status(200).json(changes)
  })
});

// custom middleware

function validatePostId(req, res, next) {
  // do your magic!
}

module.exports = router;
