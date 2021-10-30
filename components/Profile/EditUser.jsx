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
import DatePicker from '@mui/lab/DatePicker';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

const StyledSignUpDiv = styled.div`
`;

const EditUser = (props) => {
  const [editingPassword, setEditingPassword] = useState(false);
  const [showWeight, setShowWeight] = useState(props.userInfo.details.show_weight);
  const [showAge, setShowAge] = useState(props.userInfo.details.show_age);

  const router = useRouter();

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
        <p>{props.userInfo.username}</p>
      </div>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="Date of Birth"
            value={props.userInfo.details.date_of_birth}
            displayEmpty
            onChange={(e) => {
              props.setDateOfBirth(e.target.value);
            }}
            renderInput={() => <TextField
              id='date-of-birth'
              label='Date of Birth'
              type='date'
              variant='filled'
              fullWidth
              defaultValue={props.userInfo.details.date_of_birth}
              onChange={(e) => {
                props.setDateOfBirth(e.target.value);
              }}
            />}
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
          label="Show Weight In Reading List"
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
          label="Show Age In Reading List"
          labelPlacement="start"
        />
        <TimeZoneList timezone={props.userInfo.details.timezone} setTimeZone={props.setTimeZone} value={props.userInfo.details.timezone} />
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
        <Button
          variant='contained'
          onClick={() => { console.log('Soonish') }}
        >
          Change Password
        </Button>

    </StyledSignUpDiv>
  )
}

export default EditUser;