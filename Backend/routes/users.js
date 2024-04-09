const express = require('express');
const router = express.Router();

const userController = require('../controllers/user_controller')

/* GET  */
router.get('/', userController.findAll); // works 
router.get("/:id([0-9]+)", userController.findById); // works 

/* post */
router.post('/register', userController.register); // works 
router.post('/login', userController.login); // works 

/* delete */
router.delete('/:id([0-9]+)', userController.deleteAdmin); // works 

/* logout */

router.get('/logout', userController.logout); // works 


module.exports = router;
