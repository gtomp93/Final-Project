import React, {useContext, useEffect, useState} from "react";
import {Link} from "react-router-dom";
import styled from "styled-components";

const Homepage = () => {
  return (
    <div style={{marginLeft: "20px"}}>
      <div>Home</div>
      <div style={{width: "100px", height: "50px", border: "solid black 1px"}}>
        <Link to={"/gameOptions/worldTour"}>World Tour</Link>
      </div>
      <div style={{width: "100px", height: "50px", border: "solid black 1px"}}>
        <Link to={"/gameOptions/worldTour"}>Canada</Link>
      </div>
      <div style={{width: "100px", height: "50px", border: "solid black 1px"}}>
        <Link to={"/gameOptions/worldTour"}>Cities</Link>
      </div>
    </div>
  );
};

export default Homepage;
