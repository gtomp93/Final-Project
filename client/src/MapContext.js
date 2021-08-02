import React, {createContext, useState} from "react";

export const MapContext = createContext(null);

export const MapContextProvider = ({children}) => {
  const [center, setCenter] = useState({lat: 0, lng: 0});

  const recenter = (lat, lng) => {
    setCenter({lat, lng});
  };

  return (
    <MapContext.Provider value={{center, recenter}}>
      {children}
    </MapContext.Provider>
  );
};
