import React from "react";
import LoadingOverlay from "react-loading-overlay";
import styled, { css } from "styled-components";
const Loader = ({ isActive }) => {
  const DarkBackground = styled.div`
    display: none; /* Hidden by default */
    position: fixed; /* Stay in place */
    z-index: 9999; /* Sit on top */
    left: 0;
    top: 0;
    width: 100%; /* Full width */
    height: 100%; /* Full height */
    overflow: auto; /* Enable scroll if needed */
    background-color: rgb(0, 0, 0); /* Fallback color */
    background-color: rgba(0, 0, 0, 0.4);
    height: 100%;
    width: 100%;

    ${(props) =>
      props.disappear &&
      css`
        display: flex;
        justify-content: center;
        align-items: center;
        /* show */
      `}
  `;
  return (
    <DarkBackground disappear={isActive}>
      <LoadingOverlay
        active={isActive}
        spinner={true}
        styles={{ heigh: "100%" }}
      ></LoadingOverlay>
    </DarkBackground>
  );
};
export default Loader;
