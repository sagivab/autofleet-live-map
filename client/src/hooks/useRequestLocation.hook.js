import { useEffect, useState } from "react";

export const REQUEST_STATUS = {
  LOADING: "loading",
  SUCCESS: "succes",
  FAILURE: "failure",
}

const useRequestLocation = () => {
  const [state, setState] = useState({ data: [], polygon: [], page: 1, userSelect: ""});
  const [hasMoreToLoad, setHasMoreToLoad] = useState(true);
  const [requestStatus, setRequestStatus] = useState(REQUEST_STATUS.LOADING);
  const [error, setError] = useState("");


  useEffect(() => {
      const fetchData = async () => {
          try {
              const params = { limit: 20, page: state.page, polygon: state.polygon }
              const requestOptions = {
                  method: 'POST',
                  headers: {
                      'Content-type': 'application/json',
                  },
                  body: JSON.stringify(params),
              };

              const response = await fetch("/vehicles", requestOptions);
              const json = await response.json();

              let vehiclesLocations = state.data.concat(json.data);
              vehiclesLocations = Array.from(new Set(vehiclesLocations.map(JSON.stringify))).map(JSON.parse);
              if(JSON.stringify(vehiclesLocations) !== JSON.stringify(state.data) && state.data !== []) {
                  setState({...state, data: vehiclesLocations});
              } 

              //if we don't have more locations to load we passfalse to show button loadmore
              if(!json.hasOwnProperty('next')) {
                  setHasMoreToLoad(false);
              } else {
                  setHasMoreToLoad(true);
              }

              setRequestStatus(REQUEST_STATUS.SUCCESS);
          } catch (e) {
              setRequestStatus(REQUEST_STATUS.FAILURE);
              setError(e);
          }
      };
      fetchData();
  
    }, [state]);

    return {
        state, setState,
        hasMoreToLoad, requestStatus, error,
    };
}

export default useRequestLocation;