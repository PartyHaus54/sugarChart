import React, { useState, useEffect } from 'react';
import django from '../../utils/django.js';
import axios from 'axios';
import { useRouter } from 'next/router';
import Link from 'next/link';

import DisplayUser from './DisplayUser.jsx';
import EditUser from './EditUser.jsx';

import styles from '../../styles/Profile.module.css';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


const Profile = ({}) => {
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

  const [token, setToken] = useState(null);
  const [userInfo, setUserInfo] = useState(placeholderUser);
  const [displayMode, setDisplayMode] = useState(true);
  const [username, setUsername] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [weight, setWeight] = useState(null);
  const [timezone, setTimeZone] = useState('');
  const [showWeight, setShowWeight] = useState(false);
  const [showAge, setShowAge] = useState(false);
  const [show24Hours, setShow24Hours] = useState(false);
  const [defaultTimespan, setDefaultTimespan] = useState(7);
  const [modalTitle, setModalTitle] = useState('Unable To Update Password');
  const [modalDescription, setModalDescription] = useState('This is the text to describe what is to be communicated to the user. Please send them good wishes and helpful guidance for their quest');
  const [modalOpen, setModalOpen] = useState(false);

  const router = useRouter();

  useEffect(() => {
    getUserInfo();
  }, []);

  useEffect(() => {
    var token = django.tokenLoader();
    setToken(token);
  }, []);

  const getUserInfo = () => {
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
      setUserInfo(response.data[0]);
      setDateOfBirth(response.data[0].details.date_of_birth);
      setWeight(response.data[0].details.weight);
      setShowAge(response.data[0].details.show_age);
      setShowWeight(response.data[0].details.show_weight);
      setDefaultTimespan(response.data[0].details.default_timespan);
      setTimeZone(response.data[0].details.timezone);
    })
    .catch(err => {
      console.log(err);
      router.push('/');
    });
  }

  const saveUserInfo = () => {
    var parsedDOB = new Date(dateOfBirth).toISOString().slice(0, 10);
    axios({
      method: 'put',
      url: `${django.url}/api/user_details/${userInfo.details.id}/`,
      headers: {
        'Accept': '*/*',
        'Authorization': `Token ${token}`,
        'Content-Type': 'application/json'
      },
      data: {
        date_of_birth: parsedDOB,
        weight: weight,
        timezone: timezone,
        default_timespan: defaultTimespan,
        show_weight: showWeight,
        show_age: showAge,
        show_24_hours: show24Hours
      }
    })
    .then((res) => {
      console.log(res);
      setDisplayMode(true);
      getUserInfo();
    });
  }

  const toggleDisplayMode = () => {
    var mode = !displayMode;
    setDisplayMode(mode);
  }

  const logout = () => {
    axios({
      method: 'post',
      url: `${django.url}/user/logout/`,
      headers: {
        'Accept': '*/*',
        'Authorization': `Token ${token}`,
        'Content-Type': 'application/json'
      }
    })
    .then((res) => {
      console.log(res);
      django.deleteToken();
    });

    django.deleteToken();
    router.push('/');
  }

  const changePasword = () => {
    if (password !== passwordConfirmation) {
      setModalTitle('Unable To Update Password');
      setModalDescription('Password Confirmation Does Not Match');
      setModalOpen(true);
    } else if (password.length < 4) {
      setModalTitle('Unable To Update Password');
      setModalDescription('Password is too short!');
      setModalOpen(true);
    } else {
      axios({
        method: 'post',
        url: `${django.url}/user/login/`,
        headers: {
          'Accept': '*/*',
          'Content-Type': 'application/json'
        },
        data: {
          username: userInfo.username,
          password: currentPassword
        }
      })
      .then((currPassResponse) => {
        axios({
          method: 'post',
          url: `${django.url}/user/change_password/`,
          headers: {
            'Accept': '*/*',
            'Authorization': `Token ${token}`,
            'Content-Type': 'application/json'
          },
          data: {
            password: password
          }
        })
        .then(passChangeResponse => {
          router.push('menu');
        })
        .catch(err => {
          console.log(err);
        });
      })
      .catch(err => {
        setModalTitle('Unable To Update Password');
        setModalDescription('The current password is not correct');
        setModalOpen(true);
      });
    }
  }

  return (
    <React.Fragment>
      {
        displayMode
          ?
        <DisplayUser userInfo={userInfo}
          toggleDisplayMode={toggleDisplayMode}
          logout={logout}
        />
          :
        <EditUser userInfo={userInfo}
          saveUserInfo={saveUserInfo}
          setCurrentPassword={setCurrentPassword}
          setPassword={setPassword}
          setPasswordConfirmation={setPasswordConfirmation}
          changePasword={changePasword}
          setDateOfBirth={setDateOfBirth}
          setWeight={setWeight}
          setTimeZone={setTimeZone}
          setShowWeight={setShowWeight}
          setShowAge={setShowAge}
          setShow24Hours={setShow24Hours}
          setDefaultTimespan={setDefaultTimespan}
          toggleDisplayMode={toggleDisplayMode}
          modalTitle={modalTitle}
          modalDescription={modalDescription}
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
        />
      }
    </React.Fragment>
  )
}

export default Profile;