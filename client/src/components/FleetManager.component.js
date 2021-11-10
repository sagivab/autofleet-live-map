import { useContext } from 'react';
import LocationList from './LocationList.component';
import FleetManagerMap from './FleetManagerMap.component';
import { LocationProvider, LocationContext } from '../contexts/LocationContext.context.js';
import { REQUEST_STATUS } from '../hooks/useRequestLocation.hook'
import './fleetManager.style.css';




const FleetManager = () => {
    return (
        <LocationProvider>
            <FleetManagerNoLocationProvider />
        </LocationProvider>
    );
}



  
const FleetManagerNoLocationProvider = () => {
    const { requestStatus, error } = useContext(LocationContext);

    if (requestStatus === REQUEST_STATUS.FAILURE) {
        return (
            <div className="text-danger">
                ERROR: <b>loading Speaker Data Failed {error}</b>
            </div>
        );
    }

    return (
        <div>
            <div className="container">
                <LocationList />
                <FleetManagerMap />
            </div>
        </div>  
    );
}



export {FleetManager};
