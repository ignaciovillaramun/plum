import { Key, ReactNode } from 'react';
import { getProfiles } from '../../../lib/mongo/profiles';

async function fetchProfiles() {
  const { profiles } = await getProfiles();
  if (!profiles) throw new Error('Failed to fetch movies!');

  return profiles;
}

export default async function Profile() {
  const profiles = await fetchProfiles();

  return (
    <div>
      <ul>
        {profiles.map(
          (profile: { name: ReactNode; _id: Key | null | undefined }) => (
            <li key={profile._id}>{profile.name}</li>
          )
        )}
      </ul>
    </div>
  );
}
