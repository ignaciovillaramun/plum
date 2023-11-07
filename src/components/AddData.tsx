import React, { useState } from 'react';

export default function AddData(props: { onAdd: any }) {
  const [newItem, setNewItem] = useState('');

  const handleAdd = () => {
    if (newItem.trim() !== '') {
      props.onAdd(newItem);
      setNewItem('');
    }
  };

  return (
    <div className="bg-zinc-100 p-5 rounded-bl-3xl rounded-tl-3xl">
      <svg
        onClick={handleAdd}
        className="w-10 text-theme-color"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1200 1200"
      >
        <path
          fill="currentColor"
          d="M600 0C268.629 0 0 268.629 0 600s268.629 600 600 600s600-268.629 600-600S931.371 0 600 0zm-95.801 261.841h191.602v242.358h242.358v191.602H695.801v242.358H504.199V695.801H261.841V504.199h242.358V261.841z"
        />
      </svg>
    </div>
  );
}
