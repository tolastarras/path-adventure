import React from 'react';

const About = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-4xl font-bold text-center mb-8 text-blue-800">About Path Adventure</h1>
      
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">How to Play</h2>
        <p className="text-gray-600 mb-4">
          Path Adventure is a puzzle game where you plan a route for a bicycle to follow from start to finish.
          The goal is to replicate the hidden path using directional moves.
        </p>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-xl font-semibold mb-3 text-green-600">Game Features</h3>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Plan your route with directional moves</li>
              <li>Watch the bicycle animate along your path</li>
              <li>Earn points for efficient routes</li>
              <li>Multiple difficulty levels</li>
              <li>Track your progress with statistics</li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-3 text-purple-600">Tips & Strategies</h3>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Use fewer moves to earn more points</li>
              <li>Plan your entire route before starting</li>
              <li>Pay attention to the grid boundaries</li>
              <li>Use the undo feature to correct mistakes</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
