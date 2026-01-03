import { getCurrentPlayer } from '@/utils/helpers';
import './BubbleDialog.css';

const BubbleDialog = ({ showBubble }) => {
  const user = getCurrentPlayer();
  if (!user) return null;

  return (
    <div
      className={`bubble-dialog__container ${showBubble ? 'show' : 'hide'}`}>
      <div className="bubble-dialog">
        Hello {user?.id}!
      </div>
      <div className="bubble-tail" />
    </div>
  );
};

export default BubbleDialog;
