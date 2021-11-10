import React, { useContext } from 'react';
import { LocationContext } from '../contexts/LocationContext.context.js';
import LocationCard from './LocationCard.component';
import { REQUEST_STATUS } from '../hooks/useRequestLocation.hook';

const LocationList = () => {
    
    const { hasMoreToLoad, requestStatus, state, setState } = useContext(LocationContext);

    const locations = state.data;

    const hasMoreButton = () => {
        if(hasMoreToLoad) {
            return(
                <div className="button-loadmore-container">
                    <button className="button-loadmore" onClick={() => setState({ ...state, page: state.page+1 })}> Load more... </button>
                </div>
            );
        }

        return (
            <div className="dot-container">
                <span className="dot"></span>
            </div>
        );
    }

    return (
        <div className="split left">
            <h3>Vehicle List</h3>
            <div className={requestStatus === REQUEST_STATUS.LOADING ? "loader" : ""}>
                <div>
                    {locations.map(location => <LocationCard key={location.id} location={location} onClick={() => setState({ ...state, userSelect: location.id })}/>)}
                </div>
            </div>
            {hasMoreButton()}            
        </div>
    );
}



export default LocationList;
