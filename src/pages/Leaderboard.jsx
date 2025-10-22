import React from 'react';

const Leaderboard = () => {
  // This would typically come from an API or context
  const leaderboardData = [
    { rank: 1, name: 'Player1', score: 150, gamesWon: 10 },
    { rank: 2, name: 'AdventureSeeker', score: 135, gamesWon: 9 },
    { rank: 3, name: 'PathMaster', score: 120, gamesWon: 8 },
    { rank: 4, name: 'BikeRider', score: 110, gamesWon: 7 },
    { rank: 5, name: 'RoutePlanner', score: 95, gamesWon: 6 },
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-4xl font-bold text-center mb-8 text-blue-800">Leaderboard</h1>
      
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Rank</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Player</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Score</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Games Won</th>
              </tr>
            </thead>
            <tbody>
              {leaderboardData.map((player) => (
                <tr key={player.rank} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full ${
                      player.rank === 1 ? 'bg-yellow-100 text-yellow-800' :
                      player.rank === 2 ? 'bg-gray-100 text-gray-800' :
                      player.rank === 3 ? 'bg-orange-100 text-orange-800' :
                      'bg-blue-50 text-blue-800'
                    }`}>
                      {player.rank}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-medium text-gray-800">{player.name}</td>
                  <td className="px-4 py-3 text-green-600 font-semibold">{player.score}</td>
                  <td className="px-4 py-3 text-blue-600">{player.gamesWon}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="mt-6 text-center text-gray-600">
          <p>Play more games to climb the leaderboard! 🚀</p>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
