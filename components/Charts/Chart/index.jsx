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
  const [lowestPoint, setLowestPoint] = useState(70);
  const [highestPoint, setHighestPoint] = useState(99);
  const [viewTop, setViewTop] = useState(((highestPoint - lowestPoint) / 10) + highestPoint);
  const [viewBottom, setViewBottom] = useState(lowestPoint - ((highestPoint - lowestPoint) / 10));
  const [viewLeft, setViewLeft] = useState(0);
  const [viewRight, setViewRight] = useState(timeRange);

  const viewTopMax = 500;
  const viewBottomMin = 0;

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

  // In order to calibrate the points to the viewbox, we will need to know a scalable value for the left/right (start/end) times
  // Solid MVP first pass suggests that time start should be ~450, and the time end ~50
  // Readings will need to be a scalable timestamp as well

  // All points most likely best handled by program with epoch/unix time
  // The app can pull the current timestamp independently:
    // x = Date.now();

  // The readings can be done with:
    // x = new Date(`${reading.observed_date}T${reading.observed_time}`).getTime();

  // Readings can be calibrated by subtracting all timestamps by that of the timespan start
  // We should convert milliseconds to minutes using:
    // x = x / 60000;

  // With everything now "left-grounded", we can simply divide all values by the value that takes the "now" timestamp to the desired right border (500 during init dev)

  return (
    <div id="chart-container">
      <StyledSVG width={chartWidth} height={chartHeight} viewBox={`0 0 500 ${viewTopMax}`} className="chart">
        <rect id="diabetes-range" x="0" y="0" width={500} height={375} fill="rgba(255,0,0,.2)"/>
        <rect id="prediabetes-range" x="0" y="375" width={500} height={25} fill="rgba(255,255,0,0.2)"/>
        <rect id="normalglycemia-range" x="0" y="400" width={500} height={30} fill="rgba(0,255,0,0.2)"/>
        <rect id="hypoglycemia-range" x="0" y="430" width={500} height={70} fill="rgba(255,0,0,.2)"/>
      </StyledSVG>
    </div>
)};

export default Chart;