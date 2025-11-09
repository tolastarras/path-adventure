import React from 'react';

const Instructions = () => {
  return (
    <div className="my-12 bg-white rounded-lg p-8 shadow-md max-w-2xl">
      <h3 className="font-bold text-lg mb-2">How to Play:</h3>
      <ul className="list-disc list-inside text-gray-600 space-y-1">
        <li>Follow the <span className="text-blue-500 font-semibold">blue path</span> from the bicycle to the finish flag</li>
        <li>Plan your moves using the direction buttons and number of squares</li>
        <li>Click "Start Journey" to see if your planned route matches the path</li>
        <li>Watch the bicycle slowly follow your planned route (shown in green dashes)</li>
        <li>Earn more points by using fewer moves!</li>
      </ul>
    </div>
  );
};

export default Instructions;
