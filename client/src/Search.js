import { useState, useCallback, useEffect, useRef } from "react";
import styled from "styled-components";
import _debounce from "lodash/debounce";
import { Link } from "react-router-dom";

const Search = ({ showModal, setShowModal }) => {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const ref = useRef(null);
  const clickOutside = (ev) => {
    if (ref.current && !ref.current.contains(ev.target)) {
      setSuggestions([]);
    }
  };
  useEffect(() => {
    document.addEventListener("click", clickOutside);
    console.log("heya");
    return () => document.removeEventListener("click", clickOutside);
  }, [ref]);

  const debounceFunc = _debounce((inputText) => {
    console.log({ inputValue });
    fetch(`/searchMaps?searchQuery=${inputText}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setSuggestions(data.data);
      });
  }, 500);

  const updateText = (e) => {
    setInputValue(e.target.value);
    debounceFunc(e.target.value);
  };

  console.log(suggestions);

  return (
    <Container>
      <Searchbar onChange={updateText} value={inputValue} />
      {!!suggestions.length && (
        <Suggestions ref={ref}>
          {suggestions.map((suggestion) => {
            return (
              <Suggestion
                to={`/explore/game/${suggestion._id}`}
                onClick={() => {
                  setShowModal(suggestion._id);
                  setSuggestions([]);
                  setInputValue("");
                }}
              >
                {suggestion.name}
              </Suggestion>
            );
          })}
        </Suggestions>
      )}
    </Container>
  );
};

export default Search;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 0;
`;

const Searchbar = styled.input`
  width: 160px;
  background-color: #d3d2d9;
  border-radius: 4px;
  box-shadow: 0 0 10px rgb(255 255 255 / 10%);
  height: 21px;
`;

const Suggestion = styled(Link)`
  background: #616161;
  border: blue;
  color: white;
  font-size: 18px;
  padding: 4px;
  &:hover {
    background: #60c7f0;
  }
  cursor: pointer;
  text-decoration: none;
`;

const Suggestions = styled.div`
  position: absolute;
  top: 21px;
  left: 2px;
  z-index: 20;
  width: 98%;
  /* border: solid lightblue 1px; */
  display: flex;
  flex-direction: column;
  background: #616161;
`;
