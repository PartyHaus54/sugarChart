import React from 'react';

import styled from'@emotion/styled';

const StyledButton = styled.button`
  height: 10rem;
  width: 10rem;
  background: #f5f5f5;
  border: none;
  margin: 1rem auto;
  box-shadow: 0px 1px 5px #0131315e;
  svg {
    height: 9rem;
    width: 9rem;
    color: #22b49f;
  }
  :hover {
    cursor: pointer;
    transform: translateY(-.25rem);
    box-shadow: 0px 5px 5px #0131315e;
  }
`;

const GraphicButton = ({content, clickHandler}) => (
  <StyledButton onClick={clickHandler}>{content}</StyledButton>
)

export default GraphicButton;