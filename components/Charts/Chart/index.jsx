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
  const [displayPoints, setDisplayPoints] = useState([]);
  const [displayLines, setDisplayLines] = useState([]);
  const [displayRanges, setDisplayRanges] = useState([]);

  var viewHeight = 500;
  var viewWidth = 500;
  const paddingPercent = 0.1;
  var padding = viewWidth * paddingPercent;

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

  const glucoseLevelRanges = [
    {
      label: 'Diabetes',
      rangeMin: 126,
      rangeMax: 500,
      color: 'rgba(255,0,0,.2)'
    },
    {
      label: 'Pre-Diabetes',
      rangeMin: 100,
      rangeMax: 125,
      color: 'rgba(255,255,0,0.2)'
    },
    {
      label: 'Normal-glycemia',
      rangeMin: 70,
      rangeMax: 99,
      color: 'rgba(0,255,0,0.2)'
    },
    {
      label: 'Hypo-glycemia',
      rangeMin: 0,
      rangeMax: 69,
      color: 'rgba(255,0,0,.2)'
    }
  ];

  useEffect(() => {
    updateRenderData(readings, timeRange);
  }, [readings]);

  const updateRenderData = (readings, dayCount) => {
    // All points should be able to have their x and y coordinates set by:
    // width = var width = document.getElementById('chart-container').offsetWidth;
    // height = tricky. width for now;
    // padding = width (or height) * paddingPercent;

      // renderRangeX = width - (width * 2 * padding);
      // valueRangeX = maxReadingX - minReadingX;
      // divisorX = valueRange / renderRange;
      // renderX = valuex / divisorX + padding

        // if the DOM will render something at 100 pixels wide, but the data range is 200 wide, divisorX = 2
        // All points can then be divided by 2 to get where they will render, plus the padding
        // Add to the above example a padding of 10 for total render width of 120
            // Data Value = 100 (mid point of value range). Divide it by divisor of 2:
            // Position with in render Range = 50. Add the padding of 10
            // Final render position = 60
              // 60 is halfway in between the low render of 10, and the high render of 110
              // Formula works
    // Except that the SVG vertical scale moves downards, so we need to subtract that value when dealing with the vertical

    // The logic for the ranges do not have shared borders (diabetes.min !== preDiabetes.max)
    // Because of this, we need the display to be between
    // the rectangle button should be min -0.5 and the rectangle top should be max + 0.5
    // Both of these points should be converted to render coordinates using the above, and the rectange height attr should be set to the post conversion difference
    // Padding for color ranges is not in play until client requests it

    // Reversed Y-Axis encourages 2 functions, (if check could also work but I'm not going to)

    // X-Axis Calibration Variables
    // There are 86,400,000 milliseaconds in a day
    var timeZoneOffset = 7;
    var now = Date.now()// - (3600000 * timeZoneOffset);
    console.log('Date.now()', now/1000);
    var timeDataMin = now - (1000 * 60 * 60 * 24 * dayCount) - (3600000 * timeZoneOffset);
    var timeDataMax = now;

    var timeDataRange = timeDataMax - timeDataMin;
    var renderRange = viewWidth - viewWidth * 2 * paddingPercent;
    var displayRanges = [];

    // console.log('ViewWidth', viewWidth);
    // console.log('Padding%', paddingPercent);
    // console.log('padding', padding);
    // console.log('time range:', timeDataRange);
    // console.log('Render Range:', renderRange);
    var timeDataDivisor = timeDataRange / renderRange;

    const convertTimeDataForRender = (point, divisor) => {
      // Issue is suspected to be in time zone
      // The Now - timespan and the reading just need to be in the same timezone
      // Handled elsewhere
      // Django string is being stored as PDT

      // With hard coded point, and the current divisor/padding calculations, it works
      // The issue is that the point being passed into this function is not accurate
      var renderValue = (point / divisor) + padding;
      // console.log('render value', renderValue);
      return renderValue;
    }

    const convertReadingLevelForRender = (point, divisor) => {
      var renderValue = viewHeight - Math.floor(point / divisor) + padding;
      console.log(renderValue);
      return renderValue;
    }

    // Y-Axis Calibration Variables
    var divisorY = 1;
    var points = [];
    var lines = [];
    // This is the min/max for the declared healthy range. Since that is hard coded, these are
    var healthyRange = glucoseLevelRanges[2];
    var minReading = healthyRange.rangeMin;
    var maxReading = healthyRange.rangeMax;

    const setChartSize = () => {
      // This is modularized in a function because dynamically setting the chart height later could get messy
      var width = document.getElementById('chart-container').offsetWidth;
      var height = width;
      setChartWidth(width);
      // Versatile height later (MVP for now)
      setChartHeight(width);
    }

    const updateXScale = () => {

    }

    const updateYScale = () => {
      readings.forEach(reading => {
        if (reading.glucose_level < minReading) {
          minReading = reading.glucose_level;
        }
        if (reading.glucose_level > maxReading) {
          maxReading = reading.glucose_level;
        }
      });
      divisorY = (maxReading - minReading) / 400;
    }

    setChartSize();
    updateYScale();


    glucoseLevelRanges.forEach((range, index) => {
      var height = Math.floor((range.rangeMax - range.rangeMin) / divisorY);
      var rangeMin = Math.floor((range.rangeMin / divisorY) - 50);
      var rangeMax = Math.floor((range.rangeMax / divisorY) - 50);
      displayRanges.push({
        id: index,
        yRender: Math.floor(500 - rangeMax),
        height: height,
        color: range.color
      });
    });

    readings.forEach((reading, index) => {
      // Get unix timestamp
      var timestamp = new Date(`${reading.observed_date}T${reading.observed_time}`).getTime();
      // console.log('Time', new Date(`${reading.observed_date}T${reading.observed_time}`));
      var difference = Date.now() - timestamp;
      // ^^ The difference from now to timestamp is accurate ^^
      // Timestamp is accurate, so the issue must be with the timeDataMin

      // Problem is here
      console.log('reading time - min:', timestamp - timeDataMin);
      // why is the time minus timestamp value below the timeDataMin?

      var xRender = convertTimeDataForRender(timestamp - timeDataMin, timeDataDivisor);

      // Calibrate to viewbox
      //var timestamp = (timestamp - timeDataMin) / timeDataDivisor;
      var yRender = ((reading.glucose_level - minReading) / divisorY) + 50;
      var coordinate = {
        id: reading.id,
        x: xRender,
        y: yRender
      };
      if (points.length > 0) {
        var line = {
          id: index,
          x1: points[index - 1].x,
          y1: points[index - 1].y,
          x2: xRender,
          y2: yRender
        }
        lines.push(line);
      }
      points.push(coordinate);
    });
    setDisplayRanges(displayRanges);
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
      <StyledSVG width={chartWidth} height={chartHeight} viewBox={`0 0 ${viewWidth} ${viewHeight}`} className="chart">
        {
          displayRanges.map(range => (
            <rect key={range.id} x="0" y={range.yRender} width={500} height={range.height} fill={range.color} />
          ))
        }
        {/* <rect id="diabetes-range" x="0" y="0" width={500} height={375} fill="rgba(255,0,0,.2)"/>
        <rect id="prediabetes-range" x="0" y={375} width={500} height={25} fill="rgba(255,255,0,0.2)"/>
        <rect id="normalglycemia-range" x="0" y={400} width={500} height={30} fill="rgba(0,255,0,0.2)"/>
        <rect id="hypoglycemia-range" x="0" y={430} width={500} height={70} fill="rgba(255,0,0,.2)"/> */}
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