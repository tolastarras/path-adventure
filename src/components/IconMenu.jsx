import { CustomIcon, UserAccountMenu } from '@/components';
import { menuItems } from '@/utils/constants';

const IconMenu = ({ onClick, onClose }) => {
  const size = 'md';

  return (
    <div className="flex space-x-1.5">
      {menuItems.map(({ id, icon }) => (
        <div key={id} className="relative" onClick={() => onClick(id)}>
          <div className="flex ">
            <CustomIcon
              className="custom-icon__default"
              size={size}
              icon={icon}
              onClose={onClose}
            />
          </div>
        </div>
      ))}
      <UserAccountMenu />
    </div>
  );
}

export default IconMenu;
