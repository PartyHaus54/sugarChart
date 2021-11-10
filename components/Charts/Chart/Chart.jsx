import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { DateTime } from 'luxon';

const StyledSVG = styled.svg`
  background-color: white;
  margin-top: 16px;
  padding: 0;
`;

const StyledAxisText = styled.text`
  //font-size: 24px;
`;

const Chart = ({timeRange, readings, activeReading }) => {
  const [viewBox, setViewBox] = useState({width: 10, height: 10});
  const [SVGWidth, setSVGWidth] = useState(500);
  const [SVGHeight, setSVGHeight] = useState(500);
  const [axisOrigin, setAxisOrigin] = useState('');
  const [xRenderConverter, setXRenderConverter] = useState(null);
  const [yRenderConverter, setYRenderConverter] = useState(null);

  const [displayRanges, setDisplayRanges] = useState([]);

  const [readingsRenders, setReadingsRenders] = useState({points: [], paths: [], labels: []});
  const [pointSize, setPointSize] = useState(5);
  const [displayLabels, setDisplayLabels] = useState([]);

  const [xAxisLabels, setXAxisLabels] = useState({ticks: [], labels: []});

  const glucoseLevelRanges = [
    {
      label: 'Diabetes',
      rangeMin: 126,
      rangeMax: 500,
      color: 'rgba(255, 0, 0, 0.2)'
    },
    {
      label: 'Pre-Diabetes',
      rangeMin: 100,
      rangeMax: 125,
      color: 'rgba(255, 255, 0, 0.2)'
    },
    {
      label: 'Normal-glycemia',
      rangeMin: 70,
      rangeMax: 99,
      color: 'rgba(0, 255, 0, 0.2)'
    },
    {
      label: 'Hypo-glycemia',
      rangeMin: 0,
      rangeMax: 69,
      color: 'rgba(255, 0, 0, 0.2)'
    }
  ];

  var healthyRange = glucoseLevelRanges[2];

  useEffect(() => {
    renderSVG();
  }, [readings, activeReading.id]);

  const renderSVG = () => {
    var viewBox = setSVGSize();
    var padding = setPaddingPx(viewBox, 0.055, .05, 0.1, .05);
    var origin = createAxisLines(viewBox, padding);
    var convertToX = createTimeToXConverter(viewBox, padding, timeRange, readings);
    var convertToY = createGlucoseLevelToYConverter(viewBox, padding, readings, glucoseLevelRanges[2]);
    var glucoseRanges = createGlucoseRanges(glucoseLevelRanges, viewBox, convertToY);
    var readingsDisplay = createReadingsDisplay(readings, convertToX, convertToY);
    var readingsLabels = createReadingLabels(readingsDisplay.points, convertToX, convertToY, activeReading);
    var xAxisLabels = createXAxisLabels(timeRange, convertToX, viewBox, padding, readings);

    setViewBox(viewBox);
    setSVGWidth(viewBox.width);
    setSVGHeight(viewBox.height);
    setAxisOrigin(origin);
    setXRenderConverter(convertToX);
    setYRenderConverter(convertToY);
    setDisplayRanges(glucoseRanges);
    setReadingsRenders(readingsDisplay);
    setDisplayLabels(readingsLabels);
    setXAxisLabels(xAxisLabels);
  }

  const setSVGSize = () => {
    var width = document.getElementById('chart-breakpoint-target').offsetWidth;
    var windowWidth = window.innerWidth;
    if (windowWidth < 600) {
      var height = width;
    } else {
      var height = window.innerHeight / 2.25;
    }
    return {
      width: width,
      height: height
    }
  }

  const setPaddingPx = (viewBox, paddingTop, paddingRight, paddingBottom, paddingLeft) => {
    return {
      top: viewBox.height * paddingTop,
      right: viewBox.width * paddingRight,
      bottom: viewBox.height * paddingBottom,
      left: viewBox.width * paddingLeft
    }
  }

  const createAxisLines = (viewBox, padding) => {
    return `${padding.left} ${padding.top} ${padding.left} ${viewBox.height - padding.bottom} ${viewBox.width - padding.right} ${viewBox.height - padding.bottom}`
    var xAxisLine = {
      x1: paddingLeft,
      y1: SVGHeight - paddingBottom,
      x2: SVGWidth - paddingRight,
      y2: SVGHeight - paddingBottom
    };
    var yAxisLine = {
      x1: paddingLeft,
      y1: paddingTop,
      x2: paddingLeft,
      y2: SVGHeight - paddingBottom
    };
    setXAxis(xAxisLine);
    setYAxis(yAxisLine);
  }

  const createTimeToXConverter = (viewBox, padding, timeSpan, readings) => {
    var endTime = Date.now();
    if (timeSpan > 0) {
      var startTime = endTime - (86400000 * timeRange);
    } else {
      var startTime = Date.parse(readings[readings.length - 1].observed_datetime);
    }
    var timeDifference = endTime - startTime;
    var xAxisDivisor = timeDifference / (viewBox.width - padding.left - padding.right);
    return function(observedDatetime) {
      var epochTime = Date.parse(observedDatetime);
      return (epochTime - startTime) / xAxisDivisor + padding.left;
    }
  }

  const createGlucoseLevelToYConverter = (viewBox, padding, readings, defaultRange) => {
    var minReading = defaultRange.rangeMin - 0.5;
    var maxReading = defaultRange.rangeMax + 0.5;
    readings.forEach(reading => {
      if (reading.glucose_level < minReading) {
        minReading = reading.glucose_level;
      }
      if (reading.glucose_level > maxReading) {
        maxReading = reading.glucose_level;
      }
    });
    var readingDifference = maxReading - minReading;
    var renderDifference = viewBox.height - padding.top - padding.bottom
    var yAxisDivisor = readingDifference / renderDifference;
    return function(glucoseLevel) {
      return viewBox.height - ((glucoseLevel - minReading) / yAxisDivisor + padding.bottom);
    }
  }

  const createGlucoseRanges = (glucoseRanges, viewBox, renderConverter) => {
    var rangesRender = glucoseRanges.map(range => {
      var rangeMinRender = renderConverter(range.rangeMin - 0.5);
      var rangeMaxRender = renderConverter(range.rangeMax + 0.5);
      var rangeHeightRender = rangeMinRender - rangeMaxRender;
      return {
        y: rangeMaxRender,
        height: rangeHeightRender,
        width: viewBox.width,
        fill: range.color
      }
    });
    return rangesRender;
  }

  const createReadingsDisplay = (readings, xConverter, yConverter) => {
    var points = [];
    var paths = [];

    readings.forEach((reading, index) => {
      points.push({
        id: reading.id,
        x: xConverter(reading.observed_datetime),
        y: yConverter(reading.glucose_level),
        label: reading.glucose_level
      });
      if (index > 0) {
        var x1 = points[index - 1].x;
        var y1 = points[index - 1].y;
        var x2 = points[index].x;
        var y2 = points[index].y;
        var cx = (x1 + x2) / 2;
        paths.push({
          key: reading.id,
          path: `M ${x1} ${y1} C ${cx} ${y1}, ${cx} ${y2}, ${x2} ${y2}`
        });
      }
    });

    var readingsDisplay = {
      points: points,
      paths: paths
    }
    return readingsDisplay;
  }

  const createReadingLabels = (renderedPoints, xConverter, yConverter, activeReading) => {
    var renderedLabels = [];
    var activeReadingAdded = false;
    if (activeReading.id) {
      // Prioritizes active reading
      renderedLabels.push({
        id: activeReading.id,
        x: xConverter(activeReading.observed_datetime),
        y: yConverter(activeReading.glucose_level),
        label: activeReading.glucose_level
      });
      activeReadingAdded = true;
    }
    renderedPoints.forEach(point => {
      if (point.id && point.id !== activeReading.id) {
        var labelOverlap = false;
        renderedLabels.forEach(label => {
          var xDiff = Math.abs(point.x - label.x);
          var yDiff = Math.abs(point.y - label.y);
          var labelDistance = (xDiff ** 2 + yDiff ** 2) ** 0.5;
          if (labelDistance < 20) {
            labelOverlap = true;
          }
        });
        if (!labelOverlap) {
          renderedLabels.push({
            id: point.id,
            x: point.x,
            y: point.y,
            label: point.label
          })
        }
      }
    });
    return renderedLabels;
  }

  const createXAxisLabels = (dayCount, xConverter, viewBox, padding, readings) => {
    var dateTime = new Date();
    var labelText = dateTime.toISOString().split('T')[0];
    var localHoursDiff = Date().split(' ')[5].slice(3)/100;
    var epochMidnight = Date.parse(labelText) - (3600000 * localHoursDiff);

    if (dayCount === 0) {
      var startEpoch = Date.parse(readings[readings.length - 1].observed_datetime);
      dayCount = Math.floor((epochMidnight - startEpoch) / 86400000);
    }
    var timeDataMin = Date.now() - (86400000 * dayCount);

    // These will render the days, hours for day span not MVP?
    var ticks = [];
    var labels = [];
    while (epochMidnight > timeDataMin) {
      dateTime = new Date(epochMidnight);
      labelText = dateTime.toISOString().split('T')[0];
      labelText = DateTime.fromISO(labelText).toFormat('LL-dd-yyyy');
      var x = xConverter(dateTime);

      if (Date.now() > epochMidnight) {
        if (labels.length === 0) {
          labels.push({
            id: labelText,
            x: x,
            y: viewBox.height - padding.bottom / 6,
            label: labelText
          });
          ticks.push({
            id: labelText,
            x: x,
            y1: viewBox.height - padding.bottom,
            y2: viewBox.height - padding.bottom / 2
          });
        } else if (labels[labels.length - 1].x - x > 80) {
          labels.push({
            id: labelText,
            x: x,
            y: viewBox.height - padding.bottom / 6,
            label: labelText
          });
          ticks.push({
            id: labelText,
            x: x,
            y1: viewBox.height - padding.bottom,
            y2: viewBox.height - padding.bottom / 2
          });
        } else {
          ticks.push({
            id: labelText,
            x: x,
            y1: viewBox.height - padding.bottom,
            y2: viewBox.height - padding.bottom / 1.3
          });
        }
      }

      epochMidnight -= 86400000;
    }
    return {
      ticks: ticks,
      labels: labels
    }
  }

  return (
    <StyledSVG width={SVGWidth} height={SVGHeight} viewBox={`0 0 ${SVGWidth} ${SVGHeight}`} className="chart">
      {
        displayRanges.map((range, key) => (
          <rect key={key} x={0} y={range.y} width={range.width} height={range.height} fill={range.fill} />
        ))
      }
      <polyline points={axisOrigin} fill="none" stroke="black" strokeWidth="2" />
      {
        xAxisLabels.ticks.map(tick =>
          <line key={tick.id} x1={tick.x} y1={tick.y1} x2={tick.x} y2={tick.y2} stroke="black" />
        )
      }
      {
        xAxisLabels.labels.map(label => (
          <StyledAxisText key={label.id} x={label.x} y={label.y} textAnchor='middle' >{label.label}</StyledAxisText>
        ))
      }
      {
        readingsRenders.paths.map(path => (
          <path key={path.key} d={path.path} strokeWidth="3" stroke="gray" fill="transparent" />
        ))
      }
      {
        readingsRenders.points.map(point => (
          <circle key={point.id} cx={point.x} cy={point.y} r={pointSize} fill={point.id === activeReading.id ? 'red' : 'black'} />
        ))
      }
      {
        displayLabels.map((point, key) => (
          <text key={key} x={point.x + pointSize} y={point.y - pointSize}
            fontSize={15}
            fill={point.id === activeReading.id ? 'red' : 'black'}
          >
            {point.label}
          </text>
        ))
      }
      {readingsRenders.points.length === 0 && <text x={SVGWidth / 2} y={SVGHeight / 2} textAnchor='middle'>No Data For Time Range</text>}
    </StyledSVG>
  )
};

export default Chart;