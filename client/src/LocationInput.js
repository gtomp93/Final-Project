import React, {useState} from "react";
import styled from "styled-components";
import Geocode from "react-geocode";

const LocationInput = ({
  getCoords,
  addLocation,
  index,
  setLocationsList,
  removeLocation,
  locationsList,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [status, setStatus] = useState(null);
  const [location, setLocation] = useState(null);

  let latitude = null;
  let longitude = null;

  const searchLocation = (input, index) => {
    console.log("index", index);

    Geocode.fromAddress(input)
      .then(
        (response) => {
          const {lat, lng} = response.results[0].geometry.location;
          latitude = lat;
          longitude = lng;
          console.log(lat, lng);
        },
        (error) => {
          console.error(error);
          setStatus("error");
        }
      )
      .then((res) => {
        console.log(latitude, longitude);
        if (latitude && longitude) {
          getCoords(latitude, longitude, index);
          setLocation({lat: latitude, lng: longitude});
          setStatus("found");
        }
      });
  };

  console.log("index", index);
  console.log("locationsList", locationsList);

  return (
    <div>
      <label>Enter Address</label>
      <input
        value={inputValue}
        onChange={(ev) => {
          let copy = locationsList;
          copy[index] = ev.target.value;
          setLocationsList(copy);
          setInputValue(ev.target.value);
        }}
        placeholder="Enter Address"
        disabled={disabled}
      ></input>

      {(status === null || status === "error") && (
        <Search onClick={() => searchLocation(locationsList[index])}>
          Search
        </Search>
      )}
      {status === "found" && (
        <Add
          onClick={() => {
            addLocation(location, index);
            setDisabled(true);
            setStatus("added");
          }}
        >
          Add
        </Add>
      )}
      {status === "added" && (
        <Remove
          onClick={(ev) => {
            removeLocation(index);
            setInputValue("");
            setDisabled(false);
            setStatus(null);
          }}
          type="reset"
          defaultValue="Reset"
        >
          Remove
        </Remove>
      )}
      {status === "error" && <Error>Location not found</Error>}
      {status === "added" && <Added>Location added!</Added>}
    </div>
  );
};

const Search = styled.button``;

const Add = styled.button``;

const Error = styled.span`
  color: red;
`;

const Remove = styled.button``;

const Added = styled.span`
  color: green;
`;

export default LocationInput;
