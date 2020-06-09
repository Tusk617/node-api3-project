const express = require('express');

const router = express.Router();
const Users = require("./userDb.js")
const Posts = require("../posts/postDb.js")

router.post('/', validateUser, (req, res) => {
  Users.insert(req.body)
  .then(newUser => {
    res.status(200).json(req.body);
    // console.log(newUser);
    // console.log(newUser)
  })
  .catch(error => {
    console.log(error)
  })
}); //working

router.post('/:id/posts', validatePost, (req, res) => {
  const newPost = req.body
  const id = req.params.id
  console.log(id)
  Posts.insert(newPost)
  .then(post => {
    res.status(200).json(post)
  })
  .catch(error => {
    console.log(error);
    res.status(500).json(error);
  })
  
  
}); //still needs work

router.get('/', (req, res) => {
  Users.get(req.query)
  .then(users => {
    res.status(200).json(users)
  })
}); //working

router.get('/:id', validateUserId, (req, res) => {
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
  Users.getById(req.params.id)
  .then(user => {
    if (user) {
      next();
    } else {
      res.status(404).json({error: "User ID not found"})
    }
  })
}


// function validateUser(req, res, next) {
    
// }
function validateUser(req, res, next) {
    // console.log(prop)
    console.log("Label:", req.body)
    // console.log(req.body.name.length)
    // if (req.body.name.length < 1) {
    //     res.status(400).json("no name")    
    // } else if (Object.keys(req.body).length === 0) {
    //   res.status(400).json("missing user info")
    // } else {
    //   next()
    // }
    if (Object.keys(req.body).length === 0) {
      res.status(400).json("missing user info")
    } else if (req.body.name.length < 1) {
      res.status(400).json("no name")  
    } else {
      next();
    }
  }


function validatePost(req, res, next) {
  if (Object.keys(req.body).length === 0) {
    res.status(400).json("Missing post data!")
  } else if (req.body.text.length < 1) {
    res.status(400).json("Missing required text field")
  } else {
    next()
  }
}

module.exports = router;
