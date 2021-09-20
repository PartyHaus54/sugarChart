import React from 'react';
import Link from 'next/link';
import styles from '../../styles/Profile.module.css';
import { useRouter } from 'next/router';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Profile = ({user}) => {
  const router = useRouter();

  user = {userName: 'Chauleb', dob: '05-27-1997', weight: 200}

  if (user) {
    return (
      <div>
        <div className={styles.profileContainer}>
          {
            user.image ? <img className={styles.profileImage} src={user.image}></img> :
            <AccountCircleIcon className = {styles.accountIcon}/>
          }
          <p>{user.userName}</p>
          <p>DOB: {user.dob}</p>
          <p>Weight: {user.weight}</p>
        </div>
      </div>
  )} else {
  return (
    <div>
      <div className={styles.profileContainer}>
        <img className={styles.profileImage} src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'></img>
        <p>UserName</p>
        <p>DOB: 00-00-0000</p>
        <p>Weight: 0</p>
      </div>
    </div>
  )}
}

export default Profile;