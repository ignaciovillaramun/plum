'use client';

import { useSearchParams } from 'next/navigation';
import EditTopicForm from '@/components/EditTopicForm';

export default function EditTopicPage() {
  const searchParams = useSearchParams();
  const topicId = searchParams?.get('topicId');
  console.log(topicId);

  const handleEditClick = () => {
    if (topicId === null || topicId === undefined) {
      // Navigate to the edit page with the extracted topic ID
      // searchParams?.push(`/editTopic/${topicId}`);
    }
  };

  return (
    <>
      <EditTopicForm
        onSubmit={(topic) => {
          // Handle form submission (update the topic)
          // You can use the 'topic' data here
        }}
      />
      <button
        type="button"
        className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
        onClick={handleEditClick}
      >
        Edit
      </button>
    </>
  );
}
