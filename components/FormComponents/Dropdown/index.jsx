import React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const Dropdown = ({id, label, options, handleChange}) => (
  <FormControl fullWidth>
    <InputLabel id={id}>{id.toUpperCase()}</InputLabel>
    <Select
      labelId={id}
      id={`${id}-select`}
      value={id}
      label={id}
      onChange={(e)=>{
        e.preventDefault();
        handleChange(e.target.value)
      }}
    >
      {
        options.map((option)=>(
          <MenuItem value={option}>{option}</MenuItem>
        ))
      }
    </Select>
  </FormControl>
);

export default Dropdown;