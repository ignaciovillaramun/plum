'use client';

import React, { useEffect, useState } from 'react';
import UserInfo from '@/components/UserInfo';

export default function Profile() {
  return (
    <div className="grid place-items-center h-screen -mt-24">
      <UserInfo />
    </div>
  );
}
