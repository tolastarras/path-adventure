import { getRankColor } from '@/utils/helpers';
import './RoundButton.css';

const RoundButton = ({ value, color=getRankColor(-1) }) => {
  return (
    <div className={`round-button w-6 h-6 text-sm border ${color}`}>
      {value}
    </div>
  )
}

export default RoundButton;
