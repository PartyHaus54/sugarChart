import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import HeaderBar from '../HeaderBar';

const Profile = () => {
  const router = useRouter();

  return (
    <div>
      <HeaderBar/>
      <h1>Profile</h1>
      <p>Username</p>
      <p>DOB</p>
      <p>Weight</p>
    </div>
  )
}

export default Profile;