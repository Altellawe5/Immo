const express = require('express');
const router = express.Router();
//const upload = require('../middleware/multer');

const PropertyController = require("../controllers/property_controller")

/* images */

//router.post('/upload', upload.single('image'), propertyController.uploadImage);

/* GET  */
router.get('/', PropertyController.findAll); // works 
router.get("/:id([0-9]+)", PropertyController.findById); // works
router.get('/propertyTypes', PropertyController.getPropertyTypes) //works
router.get('/regions', PropertyController.getRegions) //works

//router.get('/filter', PropertyController.filterProperty);


/* post */
router.post('/filter', PropertyController.filterProperty) //works
router.post('/search', PropertyController.searchProperty); // works note: postalCode is a string
router.post('/', PropertyController.create); // works but the admin can not creat new region, it should be already in the database

/* put */
router.put('/:id([0-9]+)', PropertyController.update); //works

/* delete */
router.delete('/:id([0-9]+)', PropertyController.delete); // works

module.exports = router;