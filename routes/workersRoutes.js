const express = require('express');
const route = express.Router();
const userController = require('../controller/workersController');

route.post('/createWorker',userController.createWorkers);
route.get('/getWorkers',userController.getWorks);
route.get('/getWorkerById/:id',userController.getWorkersById);
route.put('/updateWorker/:id',userController.updateWorkers);
route.delete('/deleteWorker/:id',userController.deleteWorkers);
route.get('/noOfWorks',userController.numberOfWorkers);
route.get('/getWorkerWithHighestId',userController.getWorksersWithHighestId);
route.get('/getWorkerWithLowestId',userController.getWorkersWithLowestId)
route.get('/getWorkerByName',userController.getWorkersbyName);
route.get('/byEmail',userController.findByEmail)
route.get('/findByCity',userController.findByCity)
module.exports = route;