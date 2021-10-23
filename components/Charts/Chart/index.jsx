import React, {useState} from 'react';
import styled from '@emotion/styled';

const StyledDiv = styled.div`
  height: 50rem;
  width: 50rem;
  background: white;
`;

const StyledSVG = styled.svg`
  background-color: black;
`

const Chart = ({data}) => {
  const [chartWidth, setChartWidth] = useState();

  const findDivWidth = () => {

  }

  return (
    <div>
      <StyledSVG width="100%" height="100" viewBox="0 0 1000 1000" className="chart">
      </StyledSVG>
    </div>
)};

export default Chart;