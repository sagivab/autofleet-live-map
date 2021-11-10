const router = require('express').Router();
const { getVehiclesLocations, sendVehiclesLocation } = require('../controllers/vehicle.controller.js');
const { paginatedResults } = require('../middlewares/paginate.middleware');

router.post('', getVehiclesLocations, paginatedResults, sendVehiclesLocation);


module.exports = router;
