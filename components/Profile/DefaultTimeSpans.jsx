import React, {useState, useEffect} from 'react';

import FormControl from '@material-ui/core/FormControl';

import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

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
    <FormControl variant="filled" fullWidth>
      <InputLabel id="timespan-label">Default Timespan</InputLabel>
      <Select
        id="default-timespan-dropdown"
        labelId="timespan-label"
        value={defaultTimespan}
        onChange={(e) => handleChange(e)}
      >
        {
          timeSpans.map((span) =>
            <MenuItem key={span.key} value={span.value}>{span.display}</MenuItem>
          )
        }
      </Select>
    </FormControl>
  )
}

export default DefaultTimeSpans;