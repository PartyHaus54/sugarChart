import React, { useState, useEffect } from 'react';

import styles from '../../styles/Profile.module.css';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const DisplayUser = ({userInfo, toggleDisplayMode}) => {
  return (
    <div>
      <div className={styles.profileContainer}>
        {
          userInfo.image
            ?
          <img className={styles.profileImage} src={userInfo.image}></img>
            :
          <AccountCircleIcon className={styles.accountIcon} />
        }
        <p>{userInfo.username}</p>
        <p>DOB: {userInfo.details.date_of_birth}</p>
        <p>Weight: {userInfo.details.weight}</p>
      </div>
      <button onClick={() => { toggleDisplayMode() }}>Edit Profile</button>
    </div>
  )
}

export default DisplayUser;