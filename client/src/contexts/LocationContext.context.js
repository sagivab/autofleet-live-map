import React, { createContext } from "react";

import useRequestLocation from "../hooks/useRequestLocation.hook";

export const LocationContext = createContext();

function LocationProvider({ children }) {
  const { state, setState, hasMoreToLoad, requestStatus, error } = useRequestLocation();

  return (
    <LocationContext.Provider value={{ state, setState, hasMoreToLoad, requestStatus, error }}>
      {children}
    </LocationContext.Provider>
  );
}

export { LocationProvider };