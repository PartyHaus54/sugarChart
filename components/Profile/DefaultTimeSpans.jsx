import React, {useState, useEffect} from 'react';

import FormControl from '@mui/material/FormControl';

import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';

const DefaultTimeSpans = ({defaultTimespan, setDefaultTimespan}) => {
  const handleChange = (e) => {
    setDefaultTimespan(e.target.value);
  };

  const timeSpans = [
    {
      key: 1,
      value: 1,
      display: 'Day'
    },
    {
      key: 2,
      value: 7,
      display: 'Week',
    },
    {
      key: 3,
      value: 30,
      display: '1 Month'
    },
    {
      key: 4,
      value: 90,
      display: '3 Months'
    },
    {
      key: 5,
      value: 180,
      display: '6 Months'
    },
    {
      key: 6,
      value: 365,
      display: 'Year'
    },
    {
      key: 7,
      value: null,
      display: 'All Time'
    }
  ];

  return (
    <TextField
      id="default-timespan-dropdown"
      select
      fullWidth
      defaultValue={defaultTimespan}
      variant="filled"
      label="Default Timespan"
      onChange={(e) => handleChange(e)}
    >
      {
        timeSpans.map((span) =>
          <MenuItem key={span.key} value={span.value}>{span.display}</MenuItem>
        )
      }
    </TextField>
  )
}

export default DefaultTimeSpans;