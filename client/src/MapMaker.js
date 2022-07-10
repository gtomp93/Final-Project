import React, { useContext } from "react";
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
  width: "75%",
  height: "250px",
  zIndex: "0",
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

  return (
    <BackgroundContainer>
      <InnerContainer>
        <h1>Map Creator- Part 2</h1>
        <Info>
          Enter an address and hit "Add Location" to add a location to your map.
        </Info>
        <MapInput dispatch={dispatch} />
        <ListContainer>
          {!mapState.addresses[0] && (
            <div>Your added locations will appear here</div>
          )}
          {mapState.addresses.map((address, index) => {
            return (
              <div style={{ border: "1px solid black" }}>
                <MapItem address={address} dispatch={dispatch} index={index} />
                <button
                  onClick={() => {
                    dispatch({ type: "removeLocation", index });
                  }}
                >
                  delete
                </button>
              </div>
            );
          })}
        </ListContainer>{" "}
        {mapState.addresses.length >= 5 && (
          <StyledButton
            onClick={async () => {
              await addLocations(mapState.locations);
              navigate("/Confirmation");
            }}
          >
            Create Map
          </StyledButton>
        )}
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
      </InnerContainer>
    </BackgroundContainer>
  );
};

const Info = styled.div`
  color: white;
  font-size: 20px;
`;

const ListContainer = styled.div`
  background: white;
  width: 85%;
  max-width: 500px;
`;

const BackgroundContainer = styled.div`
  background-image: url("https://google-maps-bucket.s3.us-east-2.amazonaws.com/shutterstock_1228111945.jpg");
  background-size: cover;
  width: 100%;
  min-height: calc(100vh - 44px);
  display: grid;
  place-items: center;
`;

const InnerContainer = styled.div`
  background: rgba(0, 0, 0, 0.7);
  padding: 16px;
  display: flex;
  flex-direction: column;
  max-width: 95%;
  color: rgba(193, 190, 190, 1);
`;

const StyledButton = styled.button`
  font-size: 20px;
  padding: 5px;
  font-weight: bold;
  width: fit-content;
`;
export default MapMaker;
