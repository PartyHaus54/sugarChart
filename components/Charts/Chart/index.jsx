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
  };

  const glucoseLevelRanges = [
    {
      label: 'Diabetes',
      rangeMin: 126,
      rangeMax: 500,
      color: 'rgba(255,0,0,0.2)'
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
    var displayRanges = [];
    // All points should be able to have their x and y coordinates set by:
    // width = var width = document.getElementById('chart-container').offsetWidth;
    // height = tricky. width for now;
    // padding = width (or height) * paddingPercent;

      // timeRenderRangeX = width - (width * 2 * padding);
      // valueRangeX = maxReadingX - minReadingX;
      // divisorX = valueRange / timeRenderRange;
      // renderX = valuex / divisorX + padding

        // if the DOM will render something at 100 pixels wide, but the data range is 200 wide, divisorX = 2
        // All points can then be divided by 2 to get where they will render, plus the padding
        // Add to the above example a padding of 10 for total render width of 120
            // Data Value = 100 (mid point of value range). Divide it by divisor of 2:
            // Position with in render Range = 50. Add the padding of 10
            // Final render position = 60
              // 60 is halfway in between the low render of 10, and the high render of 110
              // Formula works
    // Except that the SVG vertical scale moves downards, so we need to reverse that logic slightly when dealing with the vertical

    var timeZoneOffset = 0;
    // Inspiring client and devs are not UTC, but Django will be storing all users as UTC for simplicity
    // Because of this, the x-axis is calibrated correctly according to the timespan, but the query will be miscmatched (7 hours into future)
    // We'll need to implement mechanism for converting the user's UI time to the server's UTC
      // Plan is to add time zone to user setting
    var now = Date.now();
    // There are 86,400,000 milliseaconds in a day
    var timeDataMin = now - (86400000 * dayCount) - (3600000 * timeZoneOffset);
    var timeDataMax = now;

    var timeDataRange = timeDataMax - timeDataMin;
    var timeRenderRange = viewWidth - viewWidth * 2 * paddingPercent;

    var timeDataDivisor = timeDataRange / timeRenderRange;

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

    // The logic for the ranges do not have shared borders (diabetes.min !== preDiabetes.max)
    // Because of this, we need the display to be between
    // the rectangle button should be min -0.5 and the rectangle top should be max + 0.5
    // Both of these points should be converted to render coordinates using the above, and the rectange height attr should be set to the post conversion difference
    // Padding for color ranges is not in play until client requests it
    const findReadingDataRange = () => {
      readings.forEach(reading => {
        if (reading.glucose_level < minReading) {
          minReading = reading.glucose_level;
        }
        if (reading.glucose_level > maxReading) {
          maxReading = reading.glucose_level;
        }
      });
      return readingDataRange = maxReading - minReading;
    }

    var readingDataDivisor = 1;
    var points = [];
    var lines = [];

    var healthyRange = glucoseLevelRanges[2];
    var minReading = healthyRange.rangeMin;
    var maxReading = healthyRange.rangeMax;

    var readingDataRange = findReadingDataRange();
    var readingRenderRange = viewHeight - viewHeight * 2 * paddingPercent

    readingDataDivisor = readingDataRange / readingRenderRange;

    const setChartSize = () => {
      // This is modularized in a function because dynamically setting the chart height later could get messy
      var width = document.getElementById('chart-container').offsetWidth;
      var height = width;
      setChartWidth(width);
      // Versatile height later (MVP for now)
      setChartHeight(width);
    }

    setChartSize();
    findReadingDataRange();

    const convertReadingLevelForRender = (point, divisor) => {
      var renderValue = viewHeight - (point / divisor) - padding;
      return renderValue;
    }

    glucoseLevelRanges.forEach((range, index) => {
      var glucoseRangeRenderMax = convertReadingLevelForRender(range.rangeMax + 0.5 - minReading, readingDataDivisor);
      var glucoseRangeRenderMin = convertReadingLevelForRender(range.rangeMin - 0.5 - minReading, readingDataDivisor);
      var renderHeight = glucoseRangeRenderMin - glucoseRangeRenderMax;
      displayRanges.push({
        id: index,
        y: glucoseRangeRenderMax,
        height: renderHeight,
        color: range.color
      });
    });

    readings.forEach((reading, index) => {
      // Get unix timestamp
      var timestamp = new Date(`${reading.observed_date}T${reading.observed_time}`).getTime();

      var xRender = convertTimeDataForRender(timestamp - timeDataMin, timeDataDivisor);
      var yRender = convertReadingLevelForRender(reading.glucose_level - minReading, readingDataDivisor);

      // Points
      var coordinate = {
        id: reading.id,
        x: xRender,
        y: yRender
      };

      // Lines
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

  return (
    <div id="chart-container">
      <StyledSVG width={chartWidth} height={chartHeight} viewBox={`0 0 ${viewWidth} ${viewHeight}`} className="chart">
        {
          displayRanges.map(range => (
            <rect key={range.id} x="0" y={range.y} width={viewWidth} height={range.height} fill={range.color} />
          ))
        }
        {
          displayLines.map(line => (
            <line key={line.id} x1={line.x1} y1={line.y1} x2={line.x2} y2={line.y2} stroke="gray"/>
          ))
        }
        {
          displayPoints.map(point => (
            <circle key={point.id} cx={point.x} cy={point.y} r="5"/>
          ))
        }
      </StyledSVG>
    </div>
)};

export default Chart;