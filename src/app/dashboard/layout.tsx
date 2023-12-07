'use client';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { NextAuthProvider } from '../providers';
import { UserProvider } from '@/components/UserProvider';
import { useState } from 'react';
import Menu from '@/components/Menu';
import { Steps, Hints } from 'intro.js-react';
import 'intro.js/introjs.css';
import { useSelectedLabel } from '@/components/SelectedLabelContext';

const inter = Inter({ subsets: ['latin'] });

export default function Login({ children }: { children: React.ReactNode }) {
  const [enabled, setEnabled] = useState(false);
  const [initialStep, setInitialStep] = useState(0);
  const onExit = () => {
    setEnabled(false);
  };
  const steps = [
    {
      element: '#dropdown',
      intro:
        'Use the dropdown to filter topics by category, user the Default option to see all topics',
      position: 'right',
    },
    {
      element: '#plus',
      intro: 'Click the plus button to add a new topic',
      position: 'left',
    },
    {
      element: '#optionsBtn',
      intro: 'Edit or delete a topic',
      position: 'right',
    },
    {
      element: '#PreviousTopic',
      intro: 'Return to the last topic that you viewed',
      position: 'right',
    },
  ];

  return (
    <>
      {' '}
      <Steps
        enabled={enabled}
        steps={steps}
        initialStep={initialStep}
        onExit={onExit}
      />
      <div className="md:ml-[80px] bg-zinc-100">{children}</div>
      <Menu />

      {/* website tour  */}
      <div
        className="fixed bottom-10 right-[65px] bg-gray-700 w-[55px] text-center rounded-full p-2 font-serif"
        onClick={() => {
          setEnabled(true);
        }}
      >
        <p className="text-4xl text-white">i</p>
      </div>
    </>
  );
}
