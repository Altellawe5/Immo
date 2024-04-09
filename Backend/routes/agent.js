const express = require('express');
const router = express.Router();

const agentController = require('../controllers/agent_controller')

/* GET  */
router.get('/', agentController.findAll); // works 
router.get("/:id([0-9]+)", agentController.findById); // works

/* post */
router.post('/', agentController.create); // works 

/* put */
router.put('/:id([0-9]+)', agentController.update); // works 

/* delete */
router.delete('/:id([0-9]+)', agentController.delete); // works

module.exports = router;