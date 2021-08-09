import React, {useState} from "react";
import styled from "styled-components";
import Geocode from "react-geocode";

const LocationInput = ({
  getCoords,
  addLocation,
  index,
  setLocationsList,
  editLocation,
  locationsList,
  setPosition,
  removeLocation,
  item,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [status, setStatus] = useState(null);
  const [location, setLocation] = useState(null);
  const [deleted, setDeleted] = useState(false);

  let latitude = null;
  let longitude = null;

  console.log("status", status);

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
          getCoords(latitude, longitude, inputValue);
          setLocation({lat: latitude, lng: longitude});
          setStatus("found");
        }
      });
  };

  console.log("index", index);
  console.log("locationsList", locationsList);

  return (
    <>
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
          <Search
            onClick={() => {
              searchLocation(locationsList[index]);
              setDisabled(false);
            }}
          >
            Search
          </Search>
        )}

        {status === "found" && (
          <>
            <Add
              onClick={() => {
                addLocation(location, index);
                setDisabled(true);
                setStatus("added");
              }}
            >
              Add
            </Add>
            <Edit
              onClick={() => {
                setStatus(null);
                setPosition(null);
                setDisabled(false);
              }}
            >
              Edit
            </Edit>
          </>
        )}
        {(status === "added" || typeof item === "object") && (
          <Edit
            onClick={(ev) => {
              editLocation(index);
              setInputValue("");
              setDisabled(false);
              setStatus(null);
            }}
            type="reset"
            defaultValue="Reset"
          >
            Edit
          </Edit>
        )}
        {index > 4 && (
          <button
            onClick={() => {
              removeLocation(index);
              setStatus("deleted");
            }}
          >
            Remove
          </button>
        )}
        {status === "error" && <Error>Location not found</Error>}
        {status === "added" && <Added>Location added!</Added>}
      </div>
    </>
  );
};

const Search = styled.button``;

const Add = styled.button``;
const Edit = styled.button``;

const Error = styled.span`
  color: red;
`;

const Added = styled.span`
  color: green;
`;

export default LocationInput;
