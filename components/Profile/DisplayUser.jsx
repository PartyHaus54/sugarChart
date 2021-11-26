import React, { useState, useEffect } from 'react';

import styles from '../../styles/Profile.module.css';
import styled from '@emotion/styled';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import Button from '@material-ui/core/Button';

import { DateTime } from 'luxon';

const StyledProfileDiv = styled.div`
`;

const StyledSaveCancelRowDiv = styled.div`
  top: 200px;
  display: flex;
  justify-content: space-between;
`;

const DisplayUser = ({userInfo, toggleDisplayMode, logout}) => {
  const handleLogoutClick = () => {
    logout();
  }

  return (
    <StyledProfileDiv>
      <div className={styles.profileContainer}>
        {
          userInfo.image
            ?
          <img className={styles.profileImage} src={userInfo.image}></img>
            :
          <AccountCircleIcon className={styles.accountIcon} />
        }
        <h1>{userInfo.username}</h1>
        <h3>DOB: {userInfo.details.date_of_birth ? DateTime.fromISO(userInfo.details.date_of_birth).toFormat('LL-dd-yyyy') : 'No DOB Entered'}</h3>
        <h3>Weight: {userInfo.details.weight ? userInfo.details.weight : 'No Weight Entered'}</h3>
      </div>
      <StyledSaveCancelRowDiv>
        <Button
          variant='contained'
          onClick={() => { toggleDisplayMode() }}
        >
          Edit
        </Button>
        <Button
          variant='contained'
          onClick={(e) => {
            e.preventDefault();
            handleLogoutClick();
          }}
        >
          Logout
        </Button>
      </StyledSaveCancelRowDiv>
    </StyledProfileDiv>
  )
}

export default DisplayUser;