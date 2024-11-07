import { NavLink } from 'react-router-dom';
import MenuItem from '../MenuItem';
import cls from './SidebarLink.module.scss';

const SidebarLink = ({
    to = '',
    icon = <></>,
    label = '',
    isOpen = false
}) => {
    return (
        <NavLink to={to} className={({isActive}) => isActive && cls.active}>
            <MenuItem 
                className={''}
                label={label}
                icon={icon}
                isOpen={isOpen}
            />
        </NavLink>
    );
}

export default SidebarLink;