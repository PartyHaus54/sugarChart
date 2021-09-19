import React from 'react';
import { useRouter } from 'next/router';

const Profile = () => {
  const router = useRouter();

  return (
    <div>
      <p>Username</p>
      <p>DOB</p>
      <p>Weight</p>
    </div>
  )
}

export default Profile;