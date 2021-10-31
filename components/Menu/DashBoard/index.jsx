import React, { useState, useEffect} from 'react';
import django from '../../../utils/django.js';
import axios from 'axios';

import styled from '@emotion/styled';

const StyledDiv = styled.div`
  position: relative;
  margin: 2rem auto;
  height: 10rem;
  width: 10rem;
  background-color: white;
  color: teal;
  border-radius: 50%;
  p {
    font-family: arial;
    margin: 0;
    font-size: 3rem;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

const DashBoard = ({dash}) => {
  const [avgSugarLevel, setAvgSugarLevel] = useState('-');
  const [token, setToken] = useState(null);

  useEffect(() => {
    getAverage();
  });

  const getAverage = () => {
    var token = django.tokenLoader();
    axios({
      method: 'get',
      url: `${django.url}/user_info/`,
      headers: {
        'Accept': '*/*',
        'Authorization': `Token ${token}`,
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        console.log(response.data[0]);
        var defaultTimespan = response.data[0].details.default_timespan;
        axios({
          method: 'get',
          url: `${django.url}/api/readings_since/${defaultTimespan}/`,
          headers: {
            'Accept': '*/*',
            "Authorization": `Token ${token}`,
            'Content-Type': 'application/json'
          }
        })
          .then(response => {
            var readings = response.data;
            var total = 0;
            readings.forEach(reading => {
              total += reading.glucose_level;
            });
            if (readings.length > 0) {
              setAvgSugarLevel(Math.ceil(total / readings.length));
            }
          });
      });
  }

  return (
    <StyledDiv>
        <p>{avgSugarLevel}</p>
    </StyledDiv>
  )
  };

export default DashBoard;