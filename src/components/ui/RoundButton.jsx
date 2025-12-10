import { getRankColor } from '@/utils/helpers';
import './RoundButton.css';

const RoundButton = ({ value, color=getRankColor(-1) }) => {
  return (
    <div className={`round-button w-8 h-8 text-sm ${color}`}>
      {value}
    </div>
  )
}

export default RoundButton;
