import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

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
    <Router>
      <Routes>
        <Route path="/*" element={<NewApp />} />
        <Route path="/legacy/*" element={<LegacyApp />} />
      </Routes>
    </Router>
  );
}

// New Code App
function NewApp() {
  return (
    <div className="new-app">
      <main className="flex flex-col grow">
        <Routes>
          <Route path="/" element={<NewHome />} />
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
