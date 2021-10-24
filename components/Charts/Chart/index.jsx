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
  const [displayPoints, setDisplayPoints] = useState([]);
  const [displayLines, setDisplayLines] = useState([]);

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
    setCoordinates(readings, timeRange);
  }, [readings]);

  const setCoordinates = (readings, dayCount) => {
    var start = Date.now() - (1000 * 60 * 60 * 24 * dayCount);
    var end = Date.now() - start;
    var divisorX = end / 500;
    var points = [];
    var lines = [];
    var minReading = 70;
    var maxReading = 100;
    readings.forEach(reading => {
      if (reading.glucose_level < minReading) {
        minReading = reading.glucose_level;
      }
      if (reading.glucose_level > maxReading) {
        maxReading = reading.glucose_level;
      }
    });
    setLowestPoint(minReading);
    setHighestPoint(maxReading);
    var divisorY = (maxReading - minReading) / 400;

    // Difference is going to be (reading - minReading) / divisor
    // divisor = (maxReading - minReading) / 400

    // Constraints:
      // minReading === 50
        // This can just be hard coded
      // maxReading === 450
        // max reading / divisorY = 400
        // divisorY = maxReading / 400
        // maxReading = (maxReading - minReading) / 400 + 50;

    readings.forEach((reading, index) => {
      // Get unix timestamp
      var timestamp = new Date(`${reading.observed_date}T${reading.observed_time}`).getTime();
      // Calibrate to viewbox
      var timestamp = (timestamp - start) / divisorX;
      var yRender = ((reading.glucose_level - minReading) / divisorY) + 50;
      var coordinate = {
        id: reading.id,
        x: timestamp,
        y: reading.glucose_level
      }
      if (points.length > 0) {
        var line = {
          id: index,
          x1: points[index - 1].x,
          y1: points[index - 1].y,
          x2: timestamp,
          y2: reading.glucose_level
        }
        lines.push(line);
      }
      points.push(coordinate);
    });
    setDisplayPoints(points);
    setDisplayLines(lines);
  }

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


  // For the vertical access, also developing off of a 500point scale, we are addding a 10% (50px) buffer to each side
  // This means that we can find the min/max of each reading, calibrate it to a 400pt span, and add 50 to all readings
  // If the lowest number is higher than the lower range of the healthy range, threshold becomes min, and vice versa
  // It may be best to have the min/max given to use by the database so we only have to iterate through the readings once while setting the points
  // The trick with the vertical axis is that standard cartesian graphs rises in value up, but SVG coordinates go down
  // The math would be easier to

  return (
    <div id="chart-container">
      <StyledSVG width={chartWidth} height={chartHeight} viewBox={`0 0 500 ${viewTopMax}`} className="chart">
        <rect id="diabetes-range" x="0" y="0" width={500} height={375} fill="rgba(255,0,0,.2)"/>
        <rect id="prediabetes-range" x="0" y="375" width={500} height={25} fill="rgba(255,255,0,0.2)"/>
        <rect id="normalglycemia-range" x="0" y="400" width={500} height={30} fill="rgba(0,255,0,0.2)"/>
        <rect id="hypoglycemia-range" x="0" y="430" width={500} height={70} fill="rgba(255,0,0,.2)"/>
        {
          displayLines.map(line => (
            <line key={line.id} x1={line.x1} y1={500 - line.y1} x2={line.x2} y2={500 - line.y2} stroke="gray"/>
          ))
        }
        {
          displayPoints.map(point => (
            <circle key={point.id} cx={point.x} cy={500 - point.y} r="5"/>
          ))
        }
      </StyledSVG>
    </div>
)};

export default Chart;