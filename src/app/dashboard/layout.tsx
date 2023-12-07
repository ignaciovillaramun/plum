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
        className="md:fixed md:bottom-10 md:right-[65px] md:bg-gray-700 md:w-[55px] md:text-center md:rounded-full md:p-2 md:font-serif"
        onClick={() => {
          setEnabled(true);
        }}
      >
        <p className="md:text-4xl md:text-white">i</p>
      </div>
    </>
  );
}
