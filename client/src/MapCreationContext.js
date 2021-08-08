import React, {createContext, useState} from "react";

export const MapCreationContext = createContext(null);

export const MapCreationContextProvider = ({children}) => {
  // const [locations, setLocations] = useState(["", "", "", "", ""]);
  const [pic, setPic] = useState(null);
  const [name, setName] = useState(null);
  const [description, setDescription] = useState(null);

  const [mapData, setMapData] = useState({});

  const handleSubmit = (name, description, pic) => {
    console.log("here");
    let copy = mapData;
    copy.name = name;
    copy.description = description;
    copy.pic = pic;
    setMapData(copy);
  };

  const addLocations = (locations) => {
    let copy = mapData;
    copy.locations = locations;
    setMapData(copy);
  };

  console.log(mapData);

  return (
    <MapCreationContext.Provider
      value={{
        handleSubmit,
        addLocations,
        name,
        setName,
        description,
        setDescription,
        pic,
        setPic,
        mapData,
      }}
    >
      {children}
    </MapCreationContext.Provider>
  );
};
