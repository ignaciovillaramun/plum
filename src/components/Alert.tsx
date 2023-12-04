import React, { useState } from 'react';
import { AiFillCloseCircle } from 'react-icons/ai';

interface AlertProps {
  title: string;
  topic: string;
  onClose: () => void; // Function to close the alert
}

const Alert: React.FC<AlertProps> = ({ title, topic, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="absolute inset-0 bg-gray-800 opacity-50"
        onClick={onClose}
      ></div>
      <div className="bg-white rounded-lg p-8 shadow-lg relative">
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 transition duration-300 ease-in-out"
          onClick={onClose}
        >
          <AiFillCloseCircle size={24} />
        </button>
        <h2 className="text-2xl font-semibold mb-4">{title}</h2>
        <p className="text-gray-600">{topic}</p>
      </div>
    </div>
  );
};

export default Alert;
