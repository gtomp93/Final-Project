import React, { useState, useEffect, useReducer, useContext } from "react";
import MapInput from "./MapInput";
import MapItem from "./MapItem";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
/*global google*/

import {
  GoogleMap,
  useLoadScript,
  StreetViewPanorama,
} from "@react-google-maps/api";
import { MapCreationContext } from "./MapCreationContext";

const streetViewStyle = {
  width: "250px",
  height: "250px",
};

const libraries = ["places"];

const streetViewOptions = {
  disableDefaultUI: true,
  streetViewControl: true,
  enableCloseButton: false,
  showRoadLabels: false,
};

const MapMaker = () => {
  const { addLocations, dispatch, mapState } = useContext(MapCreationContext);
  let navigate = useNavigate();
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  if (loadError) {
    return "error loading maps";
  }
  if (!isLoaded) {
    return "loading maps";
  }

  console.log(mapState.addresses);

  return (
    <div>
      <Info>
        Enter an address and hit "Add Location" to add a location to your map.
      </Info>
      <MapInput dispatch={dispatch} />
      <ListContainer>
        {!mapState.addresses[0] && (
          <div>Your added locations will appear here</div>
        )}
        {mapState.addresses.map((address, index) => {
          console.log(mapState.addresses[index]);
          return (
            <>
              <MapItem address={address} dispatch={dispatch} index={index} />
              <button
                onClick={() => {
                  dispatch({ type: "removeLocation", index });
                }}
              >
                delete
              </button>
            </>
          );
        })}
        {mapState.addresses.length >= 5 && (
          <button
            onClick={async () => {
              await addLocations(mapState.locations);
              navigate.push("/Confirmation");
            }}
          >
            Create Map
          </button>
        )}
      </ListContainer>
      {mapState.visibleLocation && (
        <GoogleMap
          mapContainerStyle={streetViewStyle}
          options={streetViewOptions}
          linksControl={false}
        >
          <StreetViewPanorama
            position={mapState.visibleLocation}
            visible={true}
            options={streetViewOptions}
          />
        </GoogleMap>
      )}
    </div>
  );
};

const Info = styled.div`
  color: white;
  font-size: 20px;
`;

const ListContainer = styled.div`
  width: 50%;
  background: white;
`;

export default MapMaker;
