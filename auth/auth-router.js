const router = require('express').Router();
const bcrypt = require('bcryptjs')
const usersModel = require('../users/usersModel')
const restrict = require('./authenticate-middleware');

router.post('/register', (req, res) => {
  // implement registration

  const user = req.body

  if(!user.username || !user.password) {
    return res.status(400).json({
      message: 'Incorrect values'
    })
  } else {
    const hashPassword = bcrypt.hashSync(user.password)
    user.password = hashPassword
    usersModel.addUser(user)
    .then(newUser => {
      res.status(201).json(newUser)
    })
    .catch( err => {
      res.status(500).json({error: 'Unable to save user'})
    })
  }
});   

router.post('/login', restrict(), (req, res) => {
  // implement login
 const {username, password} = req.body;
 usersModel.findById({username})
 .then(user => {
  if(user && bcrypt.compareSync(password, user.password))
  {
      // req.session.loggedIn = true;
      // req.session.username = user.username;
      console.log("hello")
      req.session.user = {id:user.id, username:user.username}
      res.status(200).json({message: `Welcome ${user.username}, heres you're ${user.id}`});
  }
  else
  {
      res.status(401).json({message: 'Access denied'});
  }
})
.catch(error =>
  {
      res.status(500).json({error: 'Unable to connect to the database'});
  })
});

module.exports = router;
