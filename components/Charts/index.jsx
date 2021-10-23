import React, {useState, useEffect} from 'react';
import django from '../../utils/django.js';
import axios from 'axios';

import Dropdown from '../FormComponents/Dropdown';
import Chart from './Chart';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

const sampleData = [
  {
      "id": 15,
      "observed_time": "16:15:00",
      "observed_date": "2021-09-18",
      "glucose_level": 100,
      "entered_time": "2021-09-18T23:15:28.307946Z"
  },
  {
      "id": 14,
      "observed_time": "16:30:00",
      "observed_date": "2021-04-29",
      "glucose_level": 101,
      "entered_time": "2021-09-18T23:03:37.370666Z"
  },
  {
      "id": 16,
      "observed_time": "16:56:00",
      "observed_date": "2021-09-18",
      "glucose_level": 128,
      "entered_time": "2021-09-18T23:56:58.727226Z"
  },
  {
      "id": 17,
      "observed_time": "16:57:00",
      "observed_date": "2021-09-18",
      "glucose_level": 92,
      "entered_time": "2021-09-18T23:57:56.268184Z"
  },
  {
      "id": 1,
      "observed_time": null,
      "observed_date": "2021-09-17",
      "glucose_level": 100,
      "entered_time": "2021-09-17T17:32:52.258253Z"
  },
  {
      "id": 2,
      "observed_time": null,
      "observed_date": "2021-09-17",
      "glucose_level": 110,
      "entered_time": "2021-09-17T17:56:21.759399Z"
  },
  {
      "id": 3,
      "observed_time": null,
      "observed_date": "2021-09-17",
      "glucose_level": 70,
      "entered_time": "2021-09-17T17:56:31.159262Z"
  },
  {
      "id": 4,
      "observed_time": null,
      "observed_date": "2021-09-17",
      "glucose_level": 64,
      "entered_time": "2021-09-17T17:56:40.211195Z"
  },
  {
      "id": 5,
      "observed_time": null,
      "observed_date": "2021-09-17",
      "glucose_level": 1,
      "entered_time": "2021-09-17T18:04:14.779325Z"
  },
  {
      "id": 6,
      "observed_time": null,
      "observed_date": "2021-09-17",
      "glucose_level": 2,
      "entered_time": "2021-09-17T18:04:18.870136Z"
  },
  {
      "id": 7,
      "observed_time": null,
      "observed_date": "2021-09-17",
      "glucose_level": 4,
      "entered_time": "2021-09-17T18:04:21.454934Z"
  },
  {
      "id": 8,
      "observed_time": null,
      "observed_date": "2021-09-17",
      "glucose_level": 8,
      "entered_time": "2021-09-17T18:04:24.705479Z"
  },
  {
      "id": 9,
      "observed_time": null,
      "observed_date": "2021-09-17",
      "glucose_level": 16,
      "entered_time": "2021-09-17T18:04:28.382861Z"
  },
  {
      "id": 10,
      "observed_time": null,
      "observed_date": "2021-09-17",
      "glucose_level": 32,
      "entered_time": "2021-09-17T18:04:33.138957Z"
  },
  {
      "id": 11,
      "observed_time": null,
      "observed_date": "2021-09-17",
      "glucose_level": 64,
      "entered_time": "2021-09-17T18:04:37.153580Z"
  },
  {
      "id": 12,
      "observed_time": null,
      "observed_date": "2021-09-17",
      "glucose_level": 128,
      "entered_time": "2021-09-17T18:04:41.839986Z"
  },
  {
      "id": 13,
      "observed_time": null,
      "observed_date": "2021-09-17",
      "glucose_level": 256,
      "entered_time": "2021-09-17T18:04:46.172363Z"
  }
];

const Charts = (props) => {
  const [timeRange, setTimeRange] = useState(1);
  const [readingSet, setReadingSet] = useState(sampleData);
  const [token, setToken] = useState('');

  useEffect(() => {
    var token = django.tokenLoader();
    axios({
      method: 'get',
      url: `${django.url}/api/readings_since/${timeRange}/`,
      headers: {
        'Accept': '*/*',
        "Authorization": `Token ${token}`,
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      setToken(token);
      setReadingSet(response.data);
    });
  }, []);

  const changeHandler = (days) => {
    //TODO:
    //GET users readings for timeRange
    //display chart with users readings for timeRange
    setTimeRange(days);
    axios({
      method: 'get',
      url: `${django.url}/api/readings_since/${days}/`,
      headers: {
        'Accept': '*/*',
        "Authorization": `Token ${token}`,
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      setReadingSet(response.data);
    });
  }

  return (
    <div>
      <h1>{`${timeRange} Chart Here`}</h1>
      <Chart data={timeRange}/>
      <Dropdown
        id="timeRange"
        label="Time Range"
        options={[
          {text: 'day',
          numOfDays: 1},
          {text: 'week',
          numOfDays: 7},
          {text: 'month',
          numOfDays: 30},
          {text: '3 months',
          numOfDays: 90},
          {text: '6 months',
          numOfDays: 180},
          {text: 'year',
          numOfDays: 365},
          {text: 'total',
          numOfDays: 0}
        ]}
        handleChange={(days) => {
          console.log('days', days);
          changeHandler(days);
        }}/>

      <table>
        <tbody>
          {readingSet.map((entry) => (
            <tr key={entry.id}>
              <td className="date">{entry.observed_date}</td>
              <td className="time">{entry.observed_time}</td>
              <td className="reading">{entry.glucose_level}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
)}

export default Charts;