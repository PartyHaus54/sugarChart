import React, { useState, useEffect } from 'react';
import django from '../../utils/django';

import axios from 'axios';

import { useRouter } from 'next/router';

import DefaultTimeSpans from './DefaultTimeSpans.jsx';
import TimeZoneList from '../TimeZones/TimeZoneList.jsx';
import PasswordFailureModal from '../Modal/PasswordFailureModal.jsx';

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
  //display: flex;
  //flex-direction: column;
`;

const EditUser = (props) => {
  const [editingPassword, setEditingPassword] = useState(false);
  const [dateOfBirth, setDateOfBirth] = useState(props.userInfo.details.date_of_birth)
  const [showWeight, setShowWeight] = useState(props.userInfo.details.show_weight);
  const [showAge, setShowAge] = useState(props.userInfo.details.show_age);
  const [show24Hours, setShow24Hours] = useState(props.userInfo.details.show_24_hours);
  const [defaultTimespan, setDefaultTimespan] = useState(props.userInfo.details.default_timespan);
  const [timezone, setTimeZone] = useState(props.userInfo.details.timezone);

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

  const handleDefaultTimespanChange = (newTimespan) => {
    var updatedTimespan = newTimespan;
    setDefaultTimespan(updatedTimespan);
    props.setDefaultTimespan(updatedTimespan);
  }

  // const handle24HoursPreferenceChange = () => {
  //   var updated24HourPreference = !show24Hours;
  //   setShow24Hours(updated24HourPreference);
  //   props.setShow24Hours(updated24HourPreference);
  // }

  const handleSaveClick = () => {
    props.saveUserInfo();
    router.push('profile');
  }



  const toggleEditingPassword = () => {
    setEditingPassword(!editingPassword);
  }

  useEffect(() => {
    if (props.userInfo.details.date_of_birth) {
      convertToUTC(props.userInfo.details.date_of_birth);
    }
  }, []);

  const convertToUTC = (datetime) => {
    var prematureDate = new Date(datetime);
    var offset = prematureDate.getTimezoneOffset();
    var prEpoch = Date.parse(prematureDate);
    prEpoch += offset * 60000
    var originalDate = new Date(prEpoch);
    console.log('Original Date', originalDate);

    setDateOfBirth(originalDate);
  }

  return (
    <StyledSignUpDiv>
      <PasswordFailureModal
        modalOpen={props.modalOpen}
        setModalOpen={props.setModalOpen}
        toggleView={() => { props.setModalOpen(!props.modalOpen); }}
        title={props.modalTitle}
        description={props.modalDescription}
      />
      <div className={styles.profileContainer}>
        {
          props.userInfo.image ? <img className={styles.profileImage} src={props.userInfo.image}></img> :
            <AccountCircleIcon className={styles.accountIcon} />
        }
        <h1>{props.userInfo.username}</h1>
      </div>
      {
        editingPassword
          ?
        <div>
          <TextField
            required
            id='password'
            label='Current Password'
            type='password'
            variant='filled'
            fullWidth
            onChange={(e) => {
              props.setCurrentPassword(e.target.value);
            }}
          />
          <TextField
            required
            id='password'
            label='New Password'
            type='password'
            variant='filled'
            fullWidth
            onChange={(e) => {
              props.setPassword(e.target.value);
            }}
          />
          <TextField
            required
            id='confirm-password'
            label='Confirm Password'
            type='password'
            variant='filled'
            fullWidth
            onChange={(e) => {
              props.setPasswordConfirmation(e.target.value);
            }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button
              variant='contained'
              onClick={() => { props.changePasword(); }}
            >
              Submit
            </Button>
            <Button
              variant='contained'
              onClick={(e) => {
                e.preventDefault();
                toggleEditingPassword();
              }}
            >
              Cancel
            </Button>
          </div>
        </div>
          :
        <React.Fragment>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <MobileDatePicker
                label="Date of Birth"
                value={dateOfBirth}
                onAccept={() => console.log('accepted')}
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
            <DefaultTimeSpans setDefaultTimespan={handleDefaultTimespanChange} defaultTimespan={defaultTimespan} />
            <TimeZoneList timezone={props.userInfo.details.timezone} setTimeZone={props.setTimeZone} value={props.userInfo.details.timezone} />
            {/* <TextField
              id='weight'
              label='Weight'
              type='number'
              variant='filled'
              fullWidth
              defaultValue={props.userInfo.details.weight}
              onChange={(e) => {
                props.setWeight(Number(e.target.value));
              }}
            /> */}
            <div className="MuiInputBase-root MuiFilledInput-root MuiFilledInput-underline MuiInputBase-fullWidth MuiInputBase-formControl" style={{ padding: '0 12px 0 12px', display: 'flex', justifyContent: 'space-between' }}>
              <p>
                  Show Weight In Readings
              </p>
                  <Checkbox
                    checked={showWeight}
                    onChange={() => { handleWeightPreferenceChange() }}
                  />
            </div>
            <div className="MuiInputBase-root MuiFilledInput-root MuiFilledInput-underline MuiInputBase-fullWidth MuiInputBase-formControl" style={{ padding: '0 12px 0 12px', display: 'flex', justifyContent: 'space-between' }}>
                <p>
                  Show Age In Readings
                </p>
                  <Checkbox
                    checked={showAge}
                    value={props.userInfo.details.show_age}
                    onChange={() => { handleAgePreferenceChange() }}
                  />
            </div>
            {/* <FormControlLabel
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
            /> */}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 20 }}>
              <Button
                variant='contained'
                onClick={() => { handleSaveClick() }}
              >
                Save
              </Button>
              <Button
                variant='contained'
                onClick={() => {
                  props.toggleDisplayMode();
                }}
              >
                Cancel
              </Button>
            </div>
            <div style={{ right: 16, position: 'absolute', bottom: 16 }}>
              <Button
                variant='contained'
                onClick={() => {
                  toggleEditingPassword();
                }}
              >
                Change Password
              </Button>
            </div>
        </React.Fragment>
      }

    </StyledSignUpDiv>
  )
}

export default EditUser;