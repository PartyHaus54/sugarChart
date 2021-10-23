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

  const colorRanges = {
    dangerouslyHigh: {
      label: 'Dangerously High',
      rangeMin: 315,
      rangeMax: null
    },
    high: {
      label: 'High',
      rangeMin: 215,
      rangeMax: 315
    },
    borderline: {
      label: 'Borderline',
      rangeMin: 120,
      rangeMax: 215
    },
    normal: {
      label: 'Normal',
      rangeMin: 70,
      rangeMax: 120
    },
    low: {
      label: 'Low',
      rangeMin: 50,
      rangeMax: 70
    },
    dangerouslyLow: {
      label: 'Dangerously Low',
      rangeMin: null,
      rangeMax: 50
    }
  }

  const glucoseLevelRanges = {
    diabetes: {
      label: 'Diabetes',
      rangeMin: 126,
      rangeMax: null,
    },
    prediabetes: {
      label: 'Pre-Diabetes',
      rangeMin: 100,
      rangeMax: 125,
    },
    normalGlycemia: {
      label: 'Normal-glycemia',
      rangeMax: 70,
      rangeMax: 99
    },
    hypoglycemia: {
      label: 'Hypo-glycemia',
      rangeMin: null,
      rangeMax: 69
    }
  }

  useEffect(() => {
    var width = document.getElementById('chart-container').offsetWidth;
    setChartWidth(width);
    // Versatile height later (MVP for now)
    setChartHeight(width);
  }, []);

  return (
    <div id="chart-container">
      <StyledSVG width={chartWidth} height={chartHeight}
        viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="chart">
      </StyledSVG>
    </div>
)};

export default Chart;