import { useRef, useEffect } from 'react';
import {Marker, Popup } from 'react-leaflet';
import LocationCard from './LocationCard.component';

const CustomMarker = ({ position, vehicle, openPopup }) => {
    const markerRef = useRef(null);


    useEffect(() => {
        if(openPopup) {
            markerRef.current.leafletElement.openPopup();
        }
    }, [openPopup]);
    
    return(
        <Marker ref={markerRef} position={position}>
            <Popup>
                <LocationCard location={vehicle} />
            </Popup>
        </Marker>
    );
}

export default CustomMarker;