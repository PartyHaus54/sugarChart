import React, { useState, useEffect } from 'react';
import django from '../../utils/django';

import axios from 'axios';

import { useRouter } from 'next/router';

import DefaultTimeSpans from './DefaultTimeSpans.jsx';
import TimeZoneList from '../TimeZones/TimeZoneList.jsx';

import styles from '../../styles/Profile.module.css';
import styled from '@emotion/styled';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

const StyledSignUpDiv = styled.div`
`;

const EditUser = (props) => {
  const [editingPassword, setEditingPassword] = useState(false);
  const [dateOfBirth, setDateOfBirth] = useState(props.userInfo.details.date_of_birth)
  const [showWeight, setShowWeight] = useState(props.userInfo.details.show_weight);
  const [showAge, setShowAge] = useState(props.userInfo.details.show_age);
  const [show24Hours, setShow24Hours] = useState(props.userInfo.details.show_24_hours);

  const router = useRouter();

  const handleDOBChange = (date) => {
    var newDate = date;
    setDateOfBirth(newDate);
    props.setDateOfBirth(newDate);
  }

  const handleAgePreferenceChange = () => {
    var updatedShowAge = !showAge;
    setShowAge(updatedShowAge);
    props.setShowAge(updatedShowAge);
  }

  const handleWeightPreferenceChange = () => {
    var updatedShowWeight = !showWeight;
    setShowWeight(updatedShowWeight);
    props.setShowWeight(updatedShowWeight);
  }

  const handle24HoursPreferenceChange = () => {
    var updated24HourPreference = !show24Hours;
    setShow24Hours(updated24HourPreference);
    props.setShow24Hours(updated24HourPreference);
  }

  const handleSaveClick = () => {
    props.saveUserInfo();
    router.push('profile');
  }

  return (
    <StyledSignUpDiv>
      <div className={styles.profileContainer}>
        {
          props.userInfo.image ? <img className={styles.profileImage} src={props.userInfo.image}></img> :
            <AccountCircleIcon className={styles.accountIcon} />
        }
        <h1>{props.userInfo.username}</h1>
      </div>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <MobileDatePicker
          label="Date of Birth"
          //defaultValue={props.userInfo.details.date_of_birth}
          value={dateOfBirth}
          onChange={(date) => {
            handleDOBChange(date);
          }}
          renderInput={(params) =>
            <TextField {...params}
              fullWidth
              variant="filled"
            />
          }
        />
      </LocalizationProvider>
      <TextField
        id='weight'
        label='Weight'
        type='number'
        variant='filled'
        fullWidth
        defaultValue={props.userInfo.details.weight}
        onChange={(e) => {
          props.setWeight(Number(e.target.value));
        }}
      />
      <DefaultTimeSpans setDefaultTimespan={props.setDefaultTimespan} defaultTimespan={props.userInfo.details.default_timespan} />
      <FormControlLabel
        value={props.userInfo.details.show_age}
        variant="filled"
        control={
          <Checkbox
            checked={showWeight}
            onChange={() => { handleWeightPreferenceChange() }}
          />
        }
        label="Weight At Time Of Reading"
        labelPlacement="start"
      />
      <FormControlLabel
        value={props.userInfo.details.show_age}
        variant="filled"
        control={
          <Checkbox
            checked={showAge}
            onChange={() => {handleAgePreferenceChange()}}
            />
        }
        label="Age At Time Of Reading"
        labelPlacement="start"
      />
      <FormControlLabel
        value={props.userInfo.details.show_24_hours}
        variant="filled"
        control={
          <Checkbox
            checked={show24Hours}
            onChange={() => {handle24HoursPreferenceChange()}}
            />
        }
        label="24 Hour Mode For Readings"
        labelPlacement="start"
      />
      <TimeZoneList timezone={props.userInfo.details.timezone} setTimeZone={props.setTimeZone} value={props.userInfo.details.timezone} />
      <div style={{display: 'flex', justifyContent: 'space-between'}}>
        <Button
          variant='contained'
          onClick={() => { handleSaveClick() }}
        >
          Save
        </Button>
        <Button
          variant='contained'
          onClick={(e) => {
            e.preventDefault();
            props.toggleDisplayMode();
          }}
        >
          Cancel
        </Button>
      </div>
      <Button
        variant='contained'
        disabled
        onClick={() => { console.log('Soonish') }}
      >
        Change Password
      </Button>
    </StyledSignUpDiv>
  )
}

export default EditUser;