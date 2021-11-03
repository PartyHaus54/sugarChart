import React, { useState, useEffect } from 'react';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';

import FormHelperText from '@mui/material/FormHelperText';

const TimeRangeSelect = ({timeRange, updateTimeSpan}) => {

  const handleChange = (e) => {
    updateTimeSpan(e.target.value);
    //console.log(e.target.value);
  }

  const timespans = [
    {
      text: '1 Day',
      numOfDays: 1
    },
    {
      text: '1 Week',
      numOfDays: 7
    },
    {
      text: '1 Month',
      numOfDays: 30
    },
    {
      text: '3 Months',
      numOfDays: 90
    },
    {
      text: '6 Months',
      numOfDays: 180
    },
    {
      text: 'Year',
      numOfDays: 365
    },
    {
      text: 'Total',
      numOfDays: 0
    }
  ]

  return (
    <FormControl variant="filled" fullWidth>
      <InputLabel id="timespan-select-label">Time Span</InputLabel>
      <Select
        id="timespan-select"
        fullWidth
        defaultValue={timeRange}
        value={timeRange}
        label="Time Range"
        onChange={(e) => {handleChange(e)}}
      >
        {
          timespans.map((option, key) =>
            <MenuItem key={key} value={option.numOfDays}>{option.text}</MenuItem>
          )
        }
      </Select>
    </FormControl>
  )
}

export default TimeRangeSelect;