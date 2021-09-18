import React, {useState} from 'react';
import HeaderBar from '../HeaderBar';
import Dropdown from '../FormComponents/Dropdown';
import Box from '@mui/material/Box';


const Charts = (props) => {
  const [timeRange, setTimeRange] = useState('day');
  const changeHandler = (t) => {
    //TODO:
    //GET users readings for timeRange
    //display chart with users readings for timeRange
    setTimeRange(t);
  }

  return (
    <div>
      <HeaderBar/>

      <h1>{`${timeRange} Chart Here`}</h1>

      <Dropdown
        id="timeRange"
        label="Time Range"
        options={["day","week","month","3 months", "6 months", "year", "total"]}
        handleChange={changeHandler}/>
    </div>
)}

export default Charts;