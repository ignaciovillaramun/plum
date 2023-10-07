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
    <div className="mb-4">
      <input
        type="text"
        placeholder="Add new item..."
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
        className="border rounded-md p-2"
      />
      <button
        onClick={handleAdd}
        className="ml-2 p-2 bg-blue-500 text-white rounded-full cursor-pointer"
      >
        +
      </button>
    </div>
  );
}
