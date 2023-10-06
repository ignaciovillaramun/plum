'use client';

import { Key, ReactNode } from 'react';
import React, { useEffect, useState } from 'react';
import UserInfo from '@/components/UserInfo';

// async function fetchProfiles() {
//   try {
//     const response = await fetch('/api/v1/profiles/get');

//     if (!response.ok) {
//       throw new Error('Failed to fetch profiles');
//     }
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error(error);
//     throw new Error('Failed to fetch profiles');
//   }
// }

export default function Profile() {
  // const [profiles, setProfiles] = useState([]);

  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       const profilesData = await fetchProfiles();
  //       console.log(profilesData);
  //       setProfiles(profilesData);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }

  //   fetchData();
  // }, []);

  return (
    <div className="grid place-items-center h-screen -mt-24">
      {/* {profiles ? (
        <ul>
          {profiles.map(
            (profile: {
              name: ReactNode;
              email: ReactNode;
              _id: Key | null | undefined;
            }) => (
              <li key={`${profile._id}-${profile.name}-${profile.email}`}>
                Name: {profile.name}, Email: {profile.email}
              </li>
            )
          )}
        </ul>
      ) : (
        <p>Loading profiles...</p>
      )} */}
      <UserInfo />
    </div>
  );
}
