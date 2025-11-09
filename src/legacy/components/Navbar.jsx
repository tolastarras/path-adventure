import { Link } from 'react-router-dom';
import { DATA } from '../utils/constants';

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white max-w-full h-16 shadow-lg flex justify-around items-center">
      <div className="container mx-auto flex justify-between items-center max-w-3xl">
        <Link to="/legacy" className="text-2xl font-bold hover:text-blue-200 transition-colors">
          🚴‍♂️ {DATA.title}
        </Link>
        <div className="flex gap-6">
          <Link 
            to="/legacy" 
            className="hover:text-blue-200 transition-colors font-medium"
          >
            Play Game
          </Link>
          <Link 
            to="/legacy/leaderboard" 
            className="hover:text-blue-200 transition-colors font-medium"
          >
            Leaderboard
          </Link>
          <Link 
            to="/legacy/about" 
            className="hover:text-blue-200 transition-colors font-medium"
          >
            About
          </Link>
        </div>
      </div>
    </nav>
  )
};

export default Navbar;
