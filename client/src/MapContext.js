import {GoogleMap, Polyline} from "@react-google-maps/api";
import React, {createContext, useState} from "react";

export const MapContext = createContext(null);

export const MapContextProvider = ({children}) => {
  const [center, setCenter] = useState({lat: 0, lng: 0});
  const [zoom, setZoom] = useState(2);
  const [guessed, setGuessed] = useState(false);
  const [locationIndex, setLocationIndex] = useState(0);

  const recenter = (lat, lng, distance) => {
    setCenter({lat, lng});
    if (distance > 4000000) {
      setZoom(1);
    } else if (distance > 2000000) {
      setZoom(2);
    } else if (distance > 1000000) {
      setZoom(3);
    } else if (distance > 500000) {
      setZoom(4);
    } else if (distance > 200000) {
      setZoom(5);
    } else if (distance > 100000) {
      setZoom(6);
    } else if (distance > 50000) {
      setZoom(7);
    } else if (distance > 20000) {
      setZoom(8);
    } else if (distance > 5000) {
      setZoom(9);
    } else if (distance < 1000) {
      setZoom(10);
    }
  };

  const resetMap = () => {
    setGuessed(false);
    setLocationIndex(locationIndex + 1);
    setZoom(2);
    setCenter({lat: 0, lng: 0});
  };

  return (
    <MapContext.Provider
      value={{
        center,
        recenter,
        zoom,
        setZoom,
        guessed,
        setGuessed,
        resetMap,
        locationIndex,
      }}
    >
      {children}
    </MapContext.Provider>
  );
};
