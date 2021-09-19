import React from 'react';
import Link from 'next/link';
import styles from '../../styles/Profile.module.css';
import { useRouter } from 'next/router';

import HeaderBar from '../HeaderBar';

const Profile = () => {
  const router = useRouter();

  return (
    <div>
      <HeaderBar/>
      <div className={styles.profileContainer}>
        <img className={styles.profileImage} src='https://cdn.pixabay.com/photo/2016/11/29/20/22/girl-1871104_960_720.jpg'></img>
        <p>Username</p>
        <p>DOB</p>
        <p>Weight</p>
      </div>
    </div>
  )
}

export default Profile;