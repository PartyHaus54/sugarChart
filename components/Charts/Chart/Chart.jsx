import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { DateTime } from 'luxon';

const StyledDiv = styled.div`
  height: 50rem;
  width: 50rem;
  background: black;
`;

const StyledSVG = styled.svg`
  background-color: white;
  margin-top: 16px;
  //max-height: 45vh;
  padding: 0;
`;
//margin-bottom: 5px;

const StyledAxisText = styled.text`
  //font-size: 24px;
`;

const StyledActivePointText = styled.text`
  font-color: red;
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
  // const [viewWidth, setViewWidth] = useState(500);
  // const [viewHeight, setViewHeight] = useState(500);
  // const [paddingTop, setPaddingTop] = useState(50);
  // const [paddingRight, setPaddingRight] = useState(50);
  // const [paddingBottom, setPaddingBottom] = useState(50);
  // const [paddingLeft, setPaddingLeft] = useState(50);
  // const [xAxis, setXAxis] = useState({x1: 50, x2: 100, y1: 50, y2: 50});
  // // const [xAxisDivisor, setXAxisDivisor] = useState(1);
  // const [startTimestamp, setStartTimestamp] = useState(0);
  // const [yAxis, setYAxis] = useState({x1: 50, x2: 50, y1: 50, y2: 100});
  // //const [yAxisDivisor, setYAxisDivisor] = useState(1);
  // // const [minReading, setMinReading] = useState(70);




  // const [windowSizeScalingMod, setWindowSizeScalingMod] = useState(1);
  // const [timeDataMin, setTimeDataMin] = useState(0);
  // // const [maxReading, setMaxReading] = useState(99);
  // const [xRenderDivisor, setXRenderDivisor] = useState(1)
  // //const [yRenderDivisor, setYRenderDivisor] = useEffect(1);

  // const [displayPoints, setDisplayPoints] = useState([]);

  // const [displayLines, setDisplayLines] = useState([]);
  // const [displayPaths, setDisplayPaths] = useState([]);

  // const [activePoint, setActivePoint] = useState({ x: 0, y: 0 });
  // const [editCount, setEditCount] = useState(0);

  //var viewHeight = 500;
  //var viewWidth = 500;
  // const paddingPercent = 0.1;
  // var padding = 50;
  //setPadding(padding);

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
    //updateRenderData(readings, timeRange);
  }, [readings]);

  useEffect(() => {
      renderSVG();
  }, [activeReading.id]);

  // useEffect(() => {
  //   if (activeReading.id !== 0) {
  //     //updateActivePoint();
  //   }
  // }, [
  //   timeRange,
  //   activeReading
  // ]);

  const convertTimeDataForRender = (point, divisor) => {
    // Issue is suspected to be in time zone
    // The Now - timespan and the reading just need to be in the same timezone
    // Handled elsewhere
    // Django string is being stored as PDT

    // With hard coded point, and the current divisor/padding calculations, it works
    // The issue is that the point being passed into this function is not accurate
    var renderValue = ((point / divisor) + padding) * windowSizeScalingMod;
    // console.log('render value', renderValue);
    return renderValue;
  }

  const convertReadingLevelForRender = (point, divisor) => {
    var renderValue = viewHeight - (point / divisor) - padding;
    return renderValue;
  }

  const renderSVG = () => {
    var viewBox = setSVGSize();
    console.log('viewBox', viewBox);

    var padding = setPaddingPx(viewBox, 0.055, .05, 0.1, .05);
    console.log('padding', padding);

    var origin = createAxisLines(viewBox, padding);
    console.log('origin', origin);

    var convertToX = createTimeToXConverter(viewBox, padding, timeRange, readings);
    console.log('convertToX', convertToX);

    var convertToY = createGlucoseLevelToYConverter(viewBox, padding, readings, glucoseLevelRanges[2]);
    console.log('convertToY', convertToY);

    var glucoseRanges = createGlucoseRanges(glucoseLevelRanges, viewBox, convertToY);
    console.log('glucoseRanges', glucoseRanges);

    var readingsDisplay = createReadingsDisplay(readings, convertToX, convertToY);
    console.log('readingsDisplay', readingsDisplay);

    var readingsLabels = createReadingLabels(readingsDisplay.points, convertToX, convertToY, activeReading);
    console.log('readingsLabels', readingsLabels);

    var xAxisLabels = createXAxisLabels(timeRange, convertToX, viewBox, padding, readings);

    //enableReadingLevelToYAxisConverter();
    //renderGlucoseRanges(glucoseLevelRanges);

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
    // This is modularized in a function because dynamically setting the chart height later could get messy
    var width = document.getElementById('chart-breakpoint-target').offsetWidth;
    //console.log('width', width);
    var windowWidth = window.innerWidth;
    if (windowWidth < 600) {
      var height = width;
      //console.log('Window width < 600 triggered');
    } else {
      //console.log('Window width > 600 triggered');
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

  // const enableTimeToXAxisConverter = () => {
  //   var endTime = Date.now();
  //   var startTime = endTime - (86400000 * timeRange)
  //   var timeDifference = endTime - startTime;
  //   setStartTimestamp(startTime);
  //   setXAxisDivisor(timeDifference / (SVGWidth - paddingLeft - paddingRight));
  // };


  // const timeToXAxisConverter = (timestamp) => {
  //   return (timestamp - startTime) / xAxisDivisor + paddingLeft;
  // };

  const createTimeToXConverter = (viewBox, padding, timeSpan, readings) => {
    var endTime = Date.now();
    if (timeSpan > 0) {
      var startTime = endTime - (86400000 * timeRange);
    } else {
      var startTime = Date.parse(readings[readings.length - 1].observed_datetime);
    }
    var timeDifference = endTime - startTime;
    //setXAxisDivisor(timeDifference / (SVGWidth - paddingLeft - paddingRight));
    var xAxisDivisor = timeDifference / (viewBox.width - padding.left - padding.right);
    return function(observedDatetime) {
      var epochTime = Date.parse(observedDatetime);
      return (epochTime - startTime) / xAxisDivisor + padding.left;
    }
  }

  // const enableReadingLevelToYAxisConverter = () => {
  //   var minReading = healthyRange.rangeMin - 0.5;
  //   var maxReading = healthyRange.rangeMax + 0.5;
  //   readings.forEach(reading => {
  //     if (reading.glucose_level < minReading) {
  //       minReading = reading.glucose_level;
  //     }
  //     if (reading.glucose_level > maxReading) {
  //       maxReading = reading.glucose_level;
  //     }
  //   });
  //   var readingDifference = maxReading - minReading;
  //   setMinReading(minReading);
  //   setYAxisDivisor(readingDifference / (SVGHeight - paddingTop - paddingBottom));
  // }

  // const readingLevelToYAxisConverter = (glucoseLevel) => {
  //   return SVGHeight - ((glucoseLevel - minReading) / yAxisDivisor) - paddingBottom;
  // }

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
      renderedLabels.push(activeReading.id);
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
      console.log('epochMidnight', epochMidnight);
      console.log('startEpoch', startEpoch);
      dayCount = Math.ceil((epochMidnight - startEpoch) / 86400000);
      console.log('dayCount', dayCount);
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
      console.log('x', x);

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
      console.log(labelText);
    }
    return {
      ticks: ticks,
      labels: labels
    }
  }




  const updateRenderData = (readings, dayCount) => {
    var displayRanges = [];

    var now = Date.now();
    // There are 86,400,000 milliseaconds in a day
    var timeDataMin = now - (86400000 * dayCount)//  - (3600000 * timeZoneOffset);
    var timeDataMax = now;

    var timeDataRange = timeDataMax - timeDataMin;
    var timeRenderRange = viewWidth - viewWidth * 2 * paddingPercent;

    var timeDataDivisor = timeDataRange / timeRenderRange;
    console.log('timeDataDivisor', timeDataDivisor);



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
      setMinReading(minReading);
      setMaxReading(maxReading);
      return readingDataRange = maxReading - minReading;
    }

    var readingDataDivisor = 1;
    var points = [];
    var lines = [];
    var paths = [];

    var healthyRange = glucoseLevelRanges[2];
    var minReading = healthyRange.rangeMin - 0.5;
    var maxReading = healthyRange.rangeMax + 0.5;

    var readingDataRange = findReadingDataRange();
    var readingRenderRange = viewHeight - viewHeight * 2 * paddingPercent

    readingDataDivisor = readingDataRange / readingRenderRange;

    const setChartSize = () => {
      // This is modularized in a function because dynamically setting the chart height later could get messy
      var width = document.getElementById('chart-breakpoint-target').offsetWidth;
      console.log('width', width);
      var windowWidth = window.innerWidth;
      if (windowWidth < 600) {
        var height = width;
        console.log('Window width < 600 triggered');
      } else {
        console.log('Window width > 600 triggered');
        var height = window.innerHeight / 2.25;
        console.log('height', height)
        var scalingMod = (500 / height) - 1;
        scalingMod /= 2;
        scalingMod += 1;
        console.log('scaling mod', scalingMod);
        //setWindowSizeScalingMod(1.1333333333333333333333333333333);
      }
      console.log('vh/h', viewHeight / height);
      // At 1200
      // width 1443 / 1152 = 1.2526
      // height 500/399.1 = 1.2528
      setViewWidth(width);
      setSVGWidth(width);
      setSVGHeight(height);
      // windowWidth > 600
      // range = 440.62
      // container = 552
      // diff px = 111.38
      // diff % = 1.252780173392038491216921610458
      // windowWidth > 900
      // range = 680.08
      // container = 852
      // diff px = 171.92
      // diff % = 1.3233737207387366192212680861075
      // windowWidth > 1200
      // range = 919.55
      // container = 1152
      // diff px = 232.45
      // diff % = 1.2527866891414278723288565058996
    }

    //setChartSize();
    findReadingDataRange();



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

    var labelPreppedForRender = [];
    readings.forEach((reading, index) => {
      // Get unix timestamp
      var timestamp = new Date(`${reading.observed_date}T${reading.observed_time}`).getTime();

      var xRender = convertTimeDataForRender(timestamp - timeDataMin, timeDataDivisor);
      var yRender = convertReadingLevelForRender(reading.glucose_level - minReading, readingDataDivisor);

      var labelOverlap = false;
      labelPreppedForRender.forEach(label => {
        var width = Math.abs(label.x - xRender);
        var height = Math.abs(label.y - yRender);
        var distance = Math.pow(width ** 2 + height ** 2, 0.5);
        if (distance < 20) {
          labelOverlap = true;
        }
      });

      if (!labelOverlap) {
        labelPreppedForRender.push({
          id: reading.id,
          x: xRender,
          y: yRender,
          label: reading.glucose_level
        });
      }



      // Points
      var coordinate = {
        id: reading.id,
        x: xRender,
        y: yRender,
        label: reading.glucose_level
      };

      // Lines and paths
      if (points.length > 0) {
        var line = {
          id: index,
          x1: points[index - 1].x,
          y1: points[index - 1].y,
          x2: xRender,
          y2: yRender
        }
        lines.push(line);

        var controlX = (points[index - 1].x + xRender) / 2;

        var path = {
          id: index,
          path: `M ${points[index - 1].x} ${points[index - 1].y} C ${controlX} ${points[index - 1].y}, ${controlX} ${yRender}, ${xRender} ${yRender}`
        }
        paths.push(path);
      }
      points.push(coordinate);
    });
    setDisplayRanges(displayRanges);
    setDisplayPoints(points);
    setDisplayLabels(labelPreppedForRender);
    setDisplayLines(lines);
    setDisplayPaths(paths);

    // Axis should be able to utilize the above functions smoothly
    // Finding y axis is just (padding, height - padding) <=> (width - padding, height - padding)
    // Finding x axis is just (padding, padding) <=> (padding, height - padding)

    // Let's track some midnights!
    // We don't need to track each one, just the first one and then we can iterate for n - 1 midnights
    // We can pull it out of thing air with Javascript for the data and then epoch at midnight
    var labelDate = new Date();
    var labelText = labelDate.toISOString().split('T')[0];

    var localOffset = Date().split(' ')[5];

    var hoursOffset = Number(localOffset.slice(3)) / 100;

    var epochMidnight = Date.parse(labelText) - (3600000 * hoursOffset);
    if (epochMidnight > Date.now()) {
      epochMidnight -= 86400000;
    }

    // This is a check to see how many hours it's been since local midnight. It provides an accurate difference
    var hours = (Date.now() - epochMidnight) / 1000 / 60 / 60;

    var baseTickOffset = 12;

    var xTicks = [];
    var xLabels = [];
    var previousLabelRenderPosition = convertTimeDataForRender(epochMidnight - timeDataMin, timeDataDivisor);
    var firstLabelPlaced = false;

    while (epochMidnight > timeDataMin) {
      var tick = {
        x1: convertTimeDataForRender(epochMidnight - timeDataMin, timeDataDivisor),
        y1: viewHeight - padding,
        x2: convertTimeDataForRender(epochMidnight - timeDataMin, timeDataDivisor),
        y2: viewHeight - padding + baseTickOffset
      }
      if (!firstLabelPlaced) {
        tick.y2 += baseTickOffset * 1.5;
        var label = {
          x: tick.x2,
          y: tick.y2 + baseTickOffset,
          label: labelText
        }
        xLabels.push(label);
        previousLabelRenderPosition = tick.x1;
        firstLabelPlaced = true;
      } else if (previousLabelRenderPosition - tick.x1 > 125) {
        tick.y2 += baseTickOffset * 1.5;
        var label = {
          x: tick.x2,
          y: tick.y2 + baseTickOffset,
          label: DateTime.fromISO(labelText).toFormat('LL-dd-yyyy')
        }
        previousLabelRenderPosition = tick.x1;
        xLabels.push(label);
      }
      xTicks.push(tick);
      epochMidnight -= 86400000;
      labelDate = new Date(epochMidnight);
      labelText = labelDate.toISOString().split('T')[0];
    }

    var xAxisPoints = {
      x1: padding,
      y1: viewHeight - padding,
      x2: viewWidth - padding,
      y2: viewHeight - padding,
      ticks: xTicks,
      labels: xLabels
    }
    setXAxis(xAxisPoints);

    var yTicks = [];
    var yLabels = [];
    var yAxisPoints = {
      x1: padding,
      y1: padding,
      x2: padding,
      y2: viewHeight - padding,
      ticks: yTicks,
      labels: yLabels
    }
    setYAxis(yAxisPoints);
  }

  // const updateActivePoint = () => {
  //   const findReadingDataRange = () => {
  //     readings.forEach(reading => {
  //       if (reading.glucose_level < minReading) {
  //         minReading = reading.glucose_level;
  //       }
  //       if (reading.glucose_level > maxReading) {
  //         maxReading = reading.glucose_level;
  //       }
  //     });
  //     setMinReading(minReading);
  //     setMaxReading(maxReading);
  //     return readingDataRange = maxReading - minReading;
  //   }

  //   var timestamp = new Date(`${activeReading.observed_date}T${activeReading.observed_time}`).getTime();
  //   var now = Date.now();
  //   var timeDataMin = now - (86400000 * timeRange)//  - (3600000 * timeZoneOffset);
  //   var timeDataMax = now;
  //   var timeDataRange = timeDataMax - timeDataMin;
  //   var timeRenderRange = viewWidth - viewWidth * 2 * paddingPercent;
  //   var timeDataDivisor = timeDataRange / timeRenderRange;
  //   var xRender = convertTimeDataForRender(timestamp - timeDataMin, timeDataDivisor);

  //   var readingDataDivisor = 1;
  //   var readingDataRange = findReadingDataRange();
  //   var readingRenderRange = viewHeight - viewHeight * 2 * paddingPercent

  //   readingDataDivisor = readingDataRange / readingRenderRange;
  //   var yRender = convertReadingLevelForRender(activeReading.glucose_level - minReading, readingDataDivisor);

  //   var activePoint = {
  //     x: xRender,
  //     y: yRender,
  //     label: activeReading.glucose_level,
  //     color: 'red'
  //   }

  //   setActivePoint(activePoint);
  // }

  return (
    <StyledSVG width={SVGWidth} height={SVGHeight} viewBox={`0 0 ${SVGWidth} ${SVGHeight}`} className="chart">
      {
        displayRanges.map((range, key) => (
          <rect key={key} x={0} y={range.y} width={range.width} height={range.height} fill={range.fill} />
        ))
      }
      <polyline points={axisOrigin} fill="none" stroke="black" strokeWidth="2" />
      {/* <line id="x-axis" x1={xAxis.x1} y1={xAxis.y1} x2={xAxis.x2} y2={xAxis.y2} stroke="black" strokeWidth={3} />
      <line id="y-axis" x1={yAxis.x1} y1={yAxis.y1} x2={yAxis.x2} y2={yAxis.y2} stroke="black" strokeWidth={3} /> */}
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

    //var timeZoneOffset = -7;
    // Inspiring client and devs are not UTC, but Django will be storing all users as UTC for simplicity
    // Because of this, the x-axis is calibrated correctly according to the timespan, but the query will be miscmatched (7 hours into future)
    // We'll need to implement mechanism for converting the user's UI time to the server's UTC
    // Plan is to add time zone to user setting