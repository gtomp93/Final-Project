import React, { useState } from "react";
import styled from "styled-components";
import Geocode from "react-geocode";
import { BiTrash } from "react-icons/bi";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";

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
  recordError,
  names,
  disabled,
}) => {
  const [inputValue, setInputValue] = useState("");
  // const [disabled, setDisabled] = useState(false);
  const [status, setStatus] = useState(null);
  const [location, setLocation] = useState(null);
  const [deleted, setDeleted] = useState(false);

  let latitude = null;
  let longitude = null;

  const searchLocation = (input, index) => {
    Geocode.fromAddress(input)
      .then(
        (response) => {
          const { lat, lng } = response.results[0].geometry.location;
          latitude = lat;
          longitude = lng;
        },
        (error) => {
          console.error(error);
          recordError(index);
        }
      )
      .then((res) => {
        if (latitude && longitude) {
          getCoords(latitude, longitude, locationsList[index], index);
          setLocation({ lat: latitude, lng: longitude });
          setStatus("found");
        }
      });
  };

  return (
    <>
      <Container>
        <div>
          <label style={{ marginRight: "2px", fontWeight: "bolder" }}>
            Enter Address
          </label>
          <Input
            value={typeof item === "object" ? names[index] : inputValue}
            onChange={(ev) => {
              let copy = locationsList;
              copy[index] = ev.target.value;
              setLocationsList(copy);
              setInputValue(ev.target.value);
            }}
            placeholder="Enter Address"
            disabled={disabled[index]}
          ></Input>

          {!disabled[index] && (
            <Search
              onClick={() => {
                searchLocation(locationsList[index], index);
                // setDisabled(false);
              }}
            >
              Search
            </Search>
          )}

          {disabled[index] && typeof item !== "object" && (
            <>
              <Add
                onClick={() => {
                  addLocation(location, index);
                  // setDisabled(true);
                  // setStatus("added");
                }}
              >
                Add
              </Add>{" "}
            </>
          )}
          {disabled[index] && (
            <Edit
              onClick={() => {
                setStatus(null);
                setPosition(null);
                editLocation(index);
                setInputValue("");
              }}
            >
              Edit
            </Edit>
          )}

          {index > 4 && (
            <span>
              <button
                onClick={() => {
                  removeLocation(index);
                  setInputValue("");
                }}
              >
                <BiTrash
                  style={{
                    marginBottom: "-2px",
                    paddingTop: "0px",
                  }}
                />
              </button>
            </span>
          )}
        </div>
        <div>
          {item === "error" && <Error>Location not found</Error>}
          {(status === "added" || typeof item === "object") && (
            <Added>Location added!</Added>
          )}
        </div>
      </Container>
    </>
  );
};

const Search = styled.button`
  display: inline;
`;

const Container = styled.div`
  margin-bottom: 5px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex-wrap: wrap;
`;

const Input = styled.input`
  width: 200px;
`;

const Add = styled.button``;
const Edit = styled.button``;

const Error = styled.span`
  color: red;
`;

const Added = styled.span`
  color: #28eb13;
  font-weight: bolder;
  align-self: center;
`;

export default LocationInput;
