import React from 'react';

import HeaderBar from '../HeaderBar';
import Container from '@mui/material/Container';

import styled from '@emotion/styled';

const StyledDiv = styled.div`
  background: linear-gradient(#5eebd8, #14ab96);
  min-height: 100vh;
`;

const PageTemplate = ({title, content}) => (
  <StyledDiv>
    <HeaderBar title={title}/>
    <Container fixed>
      {content}
    </Container>
  </StyledDiv>
);

export default PageTemplate;