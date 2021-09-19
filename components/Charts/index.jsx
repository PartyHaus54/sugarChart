import React, {useState} from 'react';
import axios from 'axios';

import HeaderBar from '../HeaderBar';
import Dropdown from '../FormComponents/Dropdown';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import sampleData from './sampleData';

const Charts = (props) => {
  const [timeRange, setTimeRange] = useState('day');
  const [readingSet, setReadingSet] = useState('');

  //FOR DEV ONLY:
  setReadingSet(sampleData);

  const changeHandler = (t) => {
    //TODO:
    //GET users readings for timeRange
    //display chart with users readings for timeRange
    setTimeRange(t);
  }

  return (
    <div>
      <HeaderBar/>

      <Container fixed>
        <h1>{`${timeRange} Chart Here`}</h1>

        <Dropdown
          id="timeRange"
          label="Time Range"
          options={["day","week","month","3 months", "6 months", "year", "total"]}
          handleChange={changeHandler}/>

        <table>
          <tbody>
            {/* {readingSet.map((entry) => (
              <tr key={entry.id}>
                <td className="date">{entry.observed_date}</td>
                <td className="time">{entry.observed_time}</td>
                <td className="reading">{entry.glucose_level}</td>
              </tr>
            ))} */}
          </tbody>
        </table>
      </Container>
    </div>
)}

export default Charts;