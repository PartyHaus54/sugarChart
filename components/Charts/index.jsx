import React, {useState, useEffect} from 'react';
import django from '../../utils/django.js';
import axios from 'axios';

import TimeRangeSelect from '../ReadingsList/TimeRangeSelect.jsx';

import Dropdown from '../FormComponents/Dropdown';
import Chart from './Chart/Chart.jsx';
import DisplayReadings from '../ReadingsList/DisplayReadings.jsx';
import EditReadings from '../ReadingsList/EditReadings.jsx';
import EditReadingModal from '../Modal/EditReadingModal.jsx';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import styled from '@emotion/styled';

const StyledSettingsBar = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 100%;
`;

const StyledEditToggleDiv = styled.div`
  display: flex;
  justify-content: space-evenly;
  alight-content: right;
  width: 25%;
  padding-left: 12px;
`;

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

  const placeholderReading = {
    "id": 0,
    "observed_time": "16:15:00",
    "observed_date": "2021-09-18",
    "entered_time": "2021-09-18T23:15:28.307946Z",
    "glucose_level": 100,
    "age_at_reading": 0,
    "weight_at_reading": 0
  }

  const [token, setToken] = useState('');

  const [timeRange, setTimeRange] = useState(7);
  const [readings, setReadings] = useState([]);
  const [userInfo, setUserInfo] = useState(placeholderUser);

  const [editingReadings, setEditingReadings] = useState(false);


  var activeReadingPlaceholder = {};
  const [activeReading, setActiveReading] = useState(activeReadingPlaceholder);
  const [open, setOpen] = useState(false);
  const [chartSize, setChartSize] = useState(1200);

  useEffect(() => {
    getUserInfoForReadings();
  }, []);


  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 600) {
        setChartSize(window.innerWidth);
      } else if (window.innerWidth < 900) {
        if (chartSize >= 900 || chartSize < 600) {
          setChartSize(window.innerWidth);
        }
      } else if (window.innerWidth < 1200) {
        if (chartSize >= 1200 || chartSize < 900) {
          setChartSize(window.innerWidth);
        }
      } else if (window.innerWidth >= 1200) {
        if (chartSize < 1200) {
          setChartSize(window.innerWidth);
        }
      }
    }
    window.addEventListener('resize', handleResize);
    return _ => {
      window.removeEventListener('resize', handleResize)
    }
  });

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

  const updateTimeSpan = (days) => {
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

  const handleEditModeClick = () => {
    setEditingReadings(!editingReadings);
  };

  const updateActiveReading = (reading) => {
    if (reading.id !== activeReading.id) {
      setActiveReading(reading);
    } else {
      setActiveReading(placeholderReading);
    }
  }

  const displayReadingInEdit = (reading) => {
    setActiveReading(reading);
    setOpen(true);
  };

  const updateReading = (date, time, glucoseLevel, weight) => {
    var parsedObservedDate = new Date(date).toISOString().slice(0, 10);
    var updateData = {
      observed_date: parsedObservedDate,
      observed_time: time,
      glucose_level: glucoseLevel,
      weight_at_reading: weight
    };
    axios({
      method: 'put',
      url: `${django.url}/api/readings/${activeReading.id}/`,
      headers: {
        'Accept': '*/*',
        'Authorization': `Token ${token}`,
        'Content-Type': 'application/json'
      },
      data: updateData
    })
    .then(() => {
      axios({
        method: 'get',
        url: `${django.url}/api/readings_since/${timeRange}/`,
        headers: {
          'Accept': '*/*',
          "Authorization": `Token ${token}`,
          'Content-Type': 'application/json'
        }
      })
        .then(readingsResponse => {
          setActiveReading(placeholderReading);
          setReadings(readingsResponse.data);
          setOpen(false);
        });
    });
  };

  const deleteReading = () => {
    axios({
      method: 'delete',
      url: `${django.url}/api/readings/${activeReading.id}/`,
      headers: {
        'Accept': '*/*',
        'Authorization': `Token ${token}`,
        'Content-Type': 'application/json'
      }
    })
    .then(() => {
      axios({
        method: 'get',
        url: `${django.url}/api/readings_since/${timeRange}/`,
        headers: {
          'Accept': '*/*',
          "Authorization": `Token ${token}`,
          'Content-Type': 'application/json'
        }
      })
      .then(readingsResponse => {
        setReadings(readingsResponse.data);
        setOpen(false);
      });
    });
  };

  return (
    <div>
      <EditReadingModal
        open={open}
        activeReading={activeReading}
        updateReading={updateReading}
        deleteReading={deleteReading}
        userInfo={userInfo}
        setOpen={setOpen}
        toggleView={() => { setOpen(!open); }}
      />
      <Chart timeRange={timeRange}
        readings={readings}
        activeReading={activeReading}
        chartSize={chartSize}
      />
      <StyledSettingsBar id="chart-breakpoint-target">
        <TimeRangeSelect timeRange={timeRange} updateTimeSpan={updateTimeSpan} />
        <StyledEditToggleDiv className="MuiInputBase-root MuiFilledInput-root MuiFilledInput-underline MuiInputBase-formControl">
          <p>
            Edit
          </p>
          <Checkbox
            checked={editingReadings}
            value={editingReadings}
            onChange={() => { handleEditModeClick(!editingReadings) }}
          />
        </StyledEditToggleDiv>
        {/* <FormControlLabel
          value={editingReadings}
          variant="filled"
          sx={{textAlign: 'right'}}
          control={
            <Checkbox
              checked={editingReadings}
              onChange={() => { handleEditModeClick(!editingReadings) }}
            />
          }
          label="Edit"
          labelPlacement="start"
        /> */}
      </StyledSettingsBar>
      {
        !editingReadings
          ?
        <DisplayReadings readings={readings}
          userInfo={userInfo}
          activeReading={activeReading}
          updateActiveReading={updateActiveReading}
        />
          :
        <EditReadings readings={readings}
          userInfo={userInfo}
          displayReadingInEdit={displayReadingInEdit}
          activeReading={activeReading}
          setActiveReading={setActiveReading}
          setOpen={setOpen}
        />
      }
    </div>
)}

export default Charts;