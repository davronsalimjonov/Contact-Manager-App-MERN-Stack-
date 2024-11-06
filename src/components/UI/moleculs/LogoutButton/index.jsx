import { LogoutIcon } from '../../atoms/icons';
import MenuItem from '../MenuItem';

const LogoutButton = ({
    isOpen = false
}) => {
    return (
        <MenuItem 
            label='Chiqish'
            icon={<LogoutIcon />}
            isOpen={isOpen}
        />
    );
}

export default LogoutButton;