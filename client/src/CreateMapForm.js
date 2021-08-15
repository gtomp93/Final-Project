import {MapCreationContext} from "./MapCreationContext";
import {Link} from "react-router-dom";
import React, {useContext, useState} from "react";
import styled from "styled-components";
const CreateMapForm = () => {
  const {handleSubmit, mapData, imageSRC} = useContext(MapCreationContext);
  const [pic, setPic] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [required, setRequired] = useState(false);
  const [imageFile, setImageFile] = useState({file: null});

  console.log("imageSRC", imageSRC);

  return (
    <Container>
      <FormWrapper>
        <h1>Map Creator- Part 1</h1>
        <InputWrapper>
          <label>Map Name</label>
          <Input
            placeholder="name"
            onChange={(ev) => {
              setName(ev.target.value);
            }}
            disabled={submitted}
            style={{marginLeft: "8px"}}
          ></Input>
          {required && name.length < 1 && <Required>Required</Required>}
        </InputWrapper>
        <InputWrapper>
          <label style={{marginRight: "1px"}}>Description</label>
          <TextArea
            placeholder="Description"
            onChange={(ev) => {
              setDescription(ev.target.value);
            }}
            disabled={submitted}
          ></TextArea>
          {required && description.length < 1 && <Required>Required</Required>}
        </InputWrapper>
        <InputWrapper>
          <label> Picture URL</label>
          <input
            type="file"
            accept="image/*"
            onChange={(ev) => {
              let copy = {...imageFile};
              copy.file = ev.target.files[0];
              setImageFile(copy);
            }}
          ></input>
          {/* <Input
            placeholder="Image URL"
            onChange={(ev) => {
              setPic(ev.target.value);
            }}
            disabled={submitted}
          ></Input> */}
        </InputWrapper>
        <Submit
          onClick={() => {
            if (name.length > 0 && description.length > 0) {
              setRequired(false);
              handleSubmit(name, description, pic, imageFile.file);
              console.log("clicked");
              setSubmitted(!submitted);
            } else {
              setRequired(true);
            }
          }}
        >
          {submitted ? "Edit" : "Submit"}
        </Submit>
        {/* <button onClick={()=>{}}>test</button> */}
        {submitted && <Next to="/CreateMap">Next</Next>}
      </FormWrapper>
      {imageSRC && <Pic src={imageSRC}></Pic>}
    </Container>
  );
};

const Container = styled.div`
  margin-left: 7px;
  display: flex;
  flex-direction: column;
  @media (min-width: 769px) {
    flex-direction: row;
  }
`;

const FormWrapper = styled.div``;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 5px;
`;

const Input = styled.input``;

const TextArea = styled.textarea`
  width: 250px;
`;

const Required = styled.p`
  color: red;
`;

const Submit = styled.button`
  background: #b9bec7;
  border: none;
  font-size: 16px;
  border-radius: 4px;
`;

const Next = styled(Link)`
  font-size: 16px;
  background-color: #b9bec7;
  text-decoration: none;
  color: black;
  padding: 1px 4px 1px;
  margin-left: 8px;
  border-radius: 4px;
`;

const Pic = styled.img`
  width: 300px;
  height: auto;
  margin: 10px 0 0;
  @media (min-width: 769px) {
    flex-direction: row;
    margin: 20px 10px 0;
  }
`;

export default CreateMapForm;
