const vehicles = require('../data/vehicles-location.json');
const ApiError = require('../error/api-error');


const vehiclesToUser = vehicles.map(({routeCommitId, ...vehicle}) => vehicle);

const isMarkerInsidePolygon = (marker, poly) => {
      
    const x = marker.lat
    const y = marker.lng;

    let inside = false;
    for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
        let xi = poly[i].lat, yi = poly[i].lng;
        let xj = poly[j].lat, yj = poly[j].lng;

        let intersect = ((yi > y) != (yj > y))
            && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect) inside = !inside;
    }

    return inside;
};

exports.getVehiclesLocations = async (req, res, next) => {
    try {
        const { polygon } = req.body;
        req.data = vehiclesToUser;
        
        //if we have polygon in our request body we want to filter only the locations inside.
        if(polygon && polygon.length > 2) {
            req.data = req.data.filter(vehicle => isMarkerInsidePolygon(vehicle.location, polygon));
        }
        
        return next();
    } catch (e) {
        return next(new ApiError());
    }
}

exports.sendVehiclesLocation = async (req, res) => {
    try {
        res.status(200).json(res.paginatedResults);
    } catch (e) {
        return next(new ApiError());
    }
}

