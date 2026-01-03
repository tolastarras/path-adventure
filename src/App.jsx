import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CreateAccountDialog, UserLoginDialog, HowToPlayAlert } from '@/components';
import { AuthProvider, AlertBoxProvider } from '@/context';
import { AlertRegistry } from '@/components';

import NewHome from './NewHome';

// Legacy Code
import {
  Navbar as LegacyNavbar,
  Footer as LegacyFooter,
  LegacyHome,
  About as LegacyAbout,
  Leaderboard as LegacyLeaderboard,
  ComponentsTest
} from './legacy';

import './App.css';

function App() {
  return (
    <AuthProvider>
      <AlertBoxProvider>
        <Router>
          <Routes>
            <Route path="/*" element={<NewApp />} />
            <Route path="/legacy/*" element={<LegacyApp />} />
          </Routes>
        </Router>
      </AlertBoxProvider>
    </AuthProvider>
  );
}

function NewApp() {
  const [gameResultData, setGameResultData] = useState(null);

  return (
    <div className="new-app">
      <AlertRegistry gameData={gameResultData} />
      <main className="flex flex-col grow">
        <Routes>
          <Route
            path="/"
            element={
              <NewHome onGameComplete={(data) => setGameResultData(data)} />
            }
          />
        </Routes>
      </main>
    </div>
  );
}

// Legacy Code App
function LegacyApp() {
  return (
    <div className="flex flex-col min-h-screen">
      <LegacyNavbar />
      <main className="flex flex-col grow">
        <Routes>
          <Route path="/" element={<LegacyHome />} />
          <Route path="/leaderboard" element={<LegacyLeaderboard />} />
          <Route path="/about" element={<LegacyAbout />} />
          <Route path="/components-test" element={<ComponentsTest />} />
        </Routes>
      </main>
      <LegacyFooter />
    </div>
  );
}

export default App;
