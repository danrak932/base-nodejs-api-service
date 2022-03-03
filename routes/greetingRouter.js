const express = require('express');
const greetingController = require('../controllers/greetingController');

const router = express.Router();

//This project doesnt contain security, but if neeed it, then can be added as middlewares to check if token exists and user role

//BASIC CRUD
router
  .route('/')
  .get(greetingController.getAllGreetings)
  .post(greetingController.createGreeting);

router
  .route('/:id')
  .get(greetingController.getGreeting)
  .patch(greetingController.updateGreeting)
  .delete(greetingController.deleteGreeting);

module.exports = router;

/* body json expected: 
    {
        "author": "Dan"
        "message" "Hello World"
    }
*/
