import React, {useState} from "react";
import styled from "styled-components";
import Geocode from "react-geocode";

const LocationInput = ({
  location,
  locations,
  getCoords,
  addLocation,
  index,
  setLocation,
  removeLocation,
  clicked,
  setClicked,
}) => {
  // const [location1, setLocation1] = useState("");
  // const [location2, setLocation2] = useState("");
  // const [location3, setLocation3] = useState("");
  // const [location4, setLocation4] = useState("");

  console.log("location", location);
  console.log(clicked);
  //   const getCoords = (input, index) => {
  //     let latitude = null;
  //     let longitude = null;
  //     Geocode.fromAddress(input).then(
  //       (response) => {
  //         const {lat, lng} = response.results[0].geometry.location;
  //         latitude = lat;
  //         longitude = lng;
  //         console.log(lat, lng);
  //       },
  //       (error) => {
  //         console.error(error);
  //       }
  //     );
  //     if (latitude && longitude) {
  //       setLocation({latitude, longitude});
  //     }
  //   };

  return (
    <div>
      <label>Enter Address</label>
      <input
        onChange={(ev) => {
          setLocation(ev.target.value);
        }}
      ></input>
      {typeof location === "string" && (
        <Search onClick={() => getCoords(location, index)}>Search</Search>
      )}{" "}
      {typeof location === "object" && !locations[index] && (
        <Add
          onClick={() => {
            addLocation(location, index);
          }}
        >
          Add
        </Add>
      )}
      {typeof location === "object" && locations[index] && (
        <>
          {!clicked && (
            <Add
              onClick={() => {
                setClicked(true);
                addLocation(location, index);
              }}
            >
              Add
            </Add>
          )}
          {clicked && (
            <Remove
              onClick={() => {
                removeLocation(index);
                setLocation("");
              }}
            >
              Remove
            </Remove>
          )}
        </>
      )}
    </div>
  );
};

const Search = styled.button``;

const Add = styled.button``;

const Remove = styled.button``;

export default LocationInput;
