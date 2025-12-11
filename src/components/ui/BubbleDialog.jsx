import { username } from '@/utils/constants';
import './BubbleDialog.css';

const BubbleDialog = ({ showBubble }) => {
  return (
    <div
      className={`bubble-dialog__container ${showBubble ? 'show' : 'hide'}`}>
      <div className="bubble-dialog">
        Hello {username}!
      </div>
      <div className="bubble-tail" />
    </div>
  );
};

export default BubbleDialog;
