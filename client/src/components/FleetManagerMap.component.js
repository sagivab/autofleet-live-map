import { useState, useContext, useRef, useEffect } from 'react';
import { LocationContext } from '../contexts/LocationContext.context.js';
import { Map, TileLayer, FeatureGroup } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';
import 'leaflet-draw/dist/leaflet.draw.css';
import CustomMarker from './CustomMarker.component.js';


const DEFAULT_STARTING_POINT = [51.505, -0.09];

const FleetManagerMap = () => {
    const [editableFG, setEditableFG] = useState();
    const mapRef = useRef();
    const { state, setState } = useContext(LocationContext);
    
    const locations = state.data;
    
    //when polygon created, we delete the old one if exist.
    const onCreated = e => {
        const drawnItems = editableFG.leafletElement._layers;

        if (Object.keys(drawnItems).length > 1) {
            Object.keys(drawnItems).forEach((layerid, index) => {
                if (index > 0) return;
                const layer = drawnItems[layerid];
                editableFG.leafletElement.removeLayer(layer);
            });
        }
        setState({ polygon: (e.layer.editing.latlngs[0][0]), data: [], page: 1, userSelect: "" });
    };

    const onFeatureGroupReady = reactFGref => {
        setEditableFG(reactFGref);
    };

    const editControlOptions = {
        polyline: false,
        rectangle: false,
        circle: false,
        marker: false,
        circlemarker: false,
    }
    

    //first if there is chosen location set it, otherwise take the first location in data, if data is empty go to default center
    useEffect(() => {
        const { current = {} } = mapRef
        const { leafletElement: map } = current;

        let location = null;

        if(state.userSelect !== "") {
            const locationObject = state.data.filter(location => location.id === state.userSelect)[0]
            
            const { lat, lng } = locationObject.location
            location = [lat, lng];
        }

        if(location) {
            map.setView(location, 13);
        } else if(state.data?.length > 0) {
            const { lat, lng} = state.data[0].location;
            map.setView([lat, lng], 13);
        }

    }, [state.data, state.userSelect]);

    return (
        <div className="split right">
            <Map ref={mapRef} center={DEFAULT_STARTING_POINT} zoom={13} scrollWheelZoom={false}>
                <FeatureGroup
                    ref={featureGroupRef => {
                        onFeatureGroupReady(featureGroupRef);
                    }
                }>
                    <EditControl 
                        position="topright" 
                        draw={editControlOptions}
                        onCreated={onCreated}
                        onDeleted={() => setState({ data: [], polygon: [], page: 1, userSelect: "" })}
                    />
                </FeatureGroup>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                {locations.map(vehicle => {
                    const { lat, lng } = vehicle.location
                    let openPopup = false;

                    if(vehicle.id === state.userSelect) {
                        openPopup = true;
                    }
                    
                    return (
                        <CustomMarker position={[lat, lng]} openPopup={openPopup} key={vehicle.id} vehicle={vehicle} />
                    );
                })}
                
            </Map>
        </div>
    );
}

export default FleetManagerMap;
