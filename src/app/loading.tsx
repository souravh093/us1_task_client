import React from 'react';
import 'tailwindcss/tailwind.css';

const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex flex-col items-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-blue-500"></div>
        <div className="mt-4 text-xl font-semibold text-gray-700">Loading...</div>
      </div>
    </div>
  );
};

export default Loading;