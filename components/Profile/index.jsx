import React from 'react';
<<<<<<< HEAD
import Link from 'next/link';
import styles from '../../styles/Profile.module.css';
=======
>>>>>>> main
import { useRouter } from 'next/router';

const Profile = () => {
  const router = useRouter();

  return (
    <div>
<<<<<<< HEAD
      <HeaderBar title="Profile"/>
      <div className={styles.profileContainer}>
        <img className={styles.profileImage} src='https://cdn.pixabay.com/photo/2016/11/29/20/22/girl-1871104_960_720.jpg'></img>
        <p>Username</p>
        <p>DOB</p>
        <p>Weight</p>
      </div>
=======
      <p>Username</p>
      <p>DOB</p>
      <p>Weight</p>
>>>>>>> main
    </div>
  )
}

export default Profile;