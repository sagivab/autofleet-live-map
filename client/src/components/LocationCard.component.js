import "./location.style.css"

const LocationCard = ({ location, onClick }) => {
    const { id, seats, state, distance } = location;
    const { name } = location.class

    return (
        <div className="card" onClick={onClick }>
            <div className="card-container">
                <div>{id}</div>
                <div className="card-description">
                    <p><strong>Seats:</strong> {seats} </p>
                    <p><strong>State:</strong></p> <p className={state === "online" ? "state-online" : "state-inride"}>{state}</p>
                    <p><strong>Class:</strong> {name} </p>
                    <p><strong>Distance:</strong> {distance} </p>
                </div>
            </div>
        </div>
    );
}

export default LocationCard;