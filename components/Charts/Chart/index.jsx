import React, {useState, useEffect} from 'react';
import styled from '@emotion/styled';

const StyledDiv = styled.div`
  height: 50rem;
  width: 50rem;
  background: white;
`;

const StyledSVG = styled.svg`
  background-color: white;
`

const Chart = ({timeRange, readings}) => {
  const [chartWidth, setChartWidth] = useState(0);
  const [chartHeight, setChartHeight] = useState(0);

  useEffect(() => {
    var width = document.getElementById('chart-container').offsetWidth;
    setChartWidth(width);
  }, []);

  return (
    <div id="chart-container">
      <StyledSVG width={chartWidth} height="100"
        viewBox={`0 0 ${chartWidth} 1000`} className="chart">
      </StyledSVG>
    </div>
)};

export default Chart;