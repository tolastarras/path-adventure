import { CustomIcon } from '@/components';
import { menuItems } from '@/utils/constants';

const IconMenu = ({ onClick, onClose }) => {
  const size = 'lg';

  return (
    <div className="flex space-x-1.5">
      {menuItems.map(({ id, icon }) => (
        <div key={id} className="relative" onClick={() => onClick(id)}>
          <div className="flex ">
            <CustomIcon
              className="transition-transform duration-300 hover:scale-125"
              size={size}
              icon={icon}
              onClose={onClose}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default IconMenu;
