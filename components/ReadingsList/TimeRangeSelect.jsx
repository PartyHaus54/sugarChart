import React, { useState, useEffect } from 'react';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

import FormHelperText from '@mui/material/FormHelperText';

import styled from '@emotion/styled';

const TimeRangeSelect = ({timeRange, updateTimeSpan}) => {
  const StyledTimeSpanDiv = styled.div`
    width: 50%;
  `;

  const handleChange = (e) => {
    updateTimeSpan(e.target.value);
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
    <StyledTimeSpanDiv>
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
              <MenuItem
                key={key}
                value={option.numOfDays}
              >
                {option.text}
              </MenuItem>
            )
          }
        </Select>
      </FormControl>
    </StyledTimeSpanDiv>
  )
}

export default TimeRangeSelect;