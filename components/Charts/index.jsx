import React, {useState, useEffect} from 'react';
import django from '../../utils/django.js';
import axios from 'axios';

import Dropdown from '../FormComponents/Dropdown';
import Chart from './Chart';
import DisplayReadings from '../ReadingsList/DisplayReadings.jsx';
import EditReadings from '../ReadingsList/EditReadings.jsx';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

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
  const placeholderUser = {
    username: 'Username',
    details: {
      date_of_birth: '2021-09-10',
      weight: 0,
      timezone: 'US/Pacific',
      default_timespan: 7,
      show_weight: false,
      show_age: false,
      image: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
    }
  };

  const [timeRange, setTimeRange] = useState(7);
  const [readings, setReadings] = useState([]);
  const [userInfo, setUserInfo] = useState(placeholderUser);
  const [editingReadings, setEditingReadings] = useState(false);
  const [token, setToken] = useState('');

  useEffect(() => {
    getUserInfoForReadings();
    // var token = django.tokenLoader();

    // axios({
    //   method: 'get',
    //   url: `${django.url}/api/readings_since/${timeRange}/`,
    //   headers: {
    //     'Accept': '*/*',
    //     "Authorization": `Token ${token}`,
    //     'Content-Type': 'application/json'
    //   }
    // })
    // .then(response => {
    //   setToken(token);
    //   setReadings(response.data);
    // });
  }, []);

  const getUserInfoForReadings = () => {
    var newToken = django.tokenLoader();
    axios({
      method: 'get',
      url: `${django.url}/user_info/`,
      headers: {
        'Accept': '*/*',
        'Authorization': `Token ${newToken}`,
        'Content-Type': 'application/json'
      }
    })
    .then(userInfoResponse => {
      setUserInfo(userInfoResponse.data[0]);
      var timespan = userInfoResponse.data[0].details.default_timespan;
      console.log('Default timespan', timespan);
      axios({
        method: 'get',
        url: `${django.url}/api/readings_since/${timespan}/`,
        headers: {
          'Accept': '*/*',
          "Authorization": `Token ${newToken}`,
          'Content-Type': 'application/json'
        }
      })
      .then(readingsResponse => {
        setToken(newToken);
        setReadings(readingsResponse.data);
      });
    });
  }

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
      setReadings(response.data);
    });
  }

  return (
    <div>
      <h1>{`${timeRange} Day Readings`}</h1>
      <Chart timeRange={timeRange} readings={readings}/>
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
        }}
      />
      <FormControlLabel
        value={editingReadings}
        variant="filled"
        control={
          <Checkbox
            checked={editingReadings}
            onChange={() => { setEditingReadings(!editingReadings) }}
          />
        }
        label="Edit Readings"
        labelPlacement="start"
      />
      {
        !editingReadings
          ?
        <DisplayReadings readings={readings} userInfo={userInfo} editingReadings={editingReadings} />
          :
        <EditReadings readings={readings} userInfo={userInfo} editingReadings={editingReadings}/>
      }
    </div>
)}

export default Charts;