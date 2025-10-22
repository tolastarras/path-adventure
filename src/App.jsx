import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import PathFollowingGame from './components/PathFollowingGame';
import About from './pages/About';
import Leaderboard from './pages/Leaderboard';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="bg-blue-600 text-white p-4 shadow-lg">
          <div className="container mx-auto flex justify-between items-center">
            <Link to="/" className="text-2xl font-bold hover:text-blue-200 transition-colors">
              🚴‍♂️ Path Adventure
            </Link>
            <div className="flex gap-6">
              <Link 
                to="/" 
                className="hover:text-blue-200 transition-colors font-medium"
              >
                Play Game
              </Link>
              <Link 
                to="/leaderboard" 
                className="hover:text-blue-200 transition-colors font-medium"
              >
                Leaderboard
              </Link>
              <Link 
                to="/about" 
                className="hover:text-blue-200 transition-colors font-medium"
              >
                About
              </Link>
            </div>
          </div>
        </nav>

        <main>
          <Routes>
            <Route path="/" element={<PathFollowingGame />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>

        <footer className="bg-gray-800 text-white py-6 mt-12">
          <div className="container mx-auto text-center">
            <p>&copy; 2024 Path Adventure Game. Built with React and Tailwind CSS.</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
