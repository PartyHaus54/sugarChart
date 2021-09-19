import React from 'react';
import styled from '@emotion/styled';

const StyledDiv = styled.div`
  position: relative;
  margin: 2rem auto;
  height: 10rem;
  width: 10rem;
  background-color: white;
  color: teal;
  border-radius: 50%;
  p {
    font-family: arial;
    margin: 0;
    font-size: 3rem;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

const DashBoard = ({dash}) => (
  <StyledDiv>
    <p>{dash}</p>
  </StyledDiv>
);

export default DashBoard;