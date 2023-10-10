'use client';

import Image from 'next/image';
import { signIn } from 'next-auth/react';
import { useSession } from 'next-auth/react';

export default function SignInBtn(props:{onClick: any}){
  const { status, data: session } = useSession();



  const handleClick = () => {
    signIn('google') 
    if (status === 'authenticated'){
      props.onClick();
    }
  }
  return (
    <button onClick={handleClick}>
      <Image src="/google-logo.png" height={40} width={40} alt="Google Logo" />
    </button>
  );
}
