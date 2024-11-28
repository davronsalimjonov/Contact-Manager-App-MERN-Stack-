import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { cn } from '@/utils/lib';
import MenuItem from '../MenuItem';
import { RightArrowIcon } from '../../atoms/icons';
import cls from './SidebarLink.module.scss';

const SidebarLink = ({
    to = '',
    icon = <></>,
    label = '',
    isOpen = false,
    children
}) => {
    const [isOpenDropDown, setIsOpenDropdown] = useState(false)

    return (
        <NavLink to={children?.length ? children[0]?.link : to} className={({ isActive }) => cn(cls.link, isActive ? cls.active : '')}>
            <MenuItem
                onClick={() => setIsOpenDropdown(state => !state)}
                className={''}
                label={label}
                icon={icon}
                isOpen={isOpen}
                preffix={children?.length ? <RightArrowIcon style={{ transform: isOpenDropDown ? 'rotate(-90deg)' : 'rotate(90deg)', transition: 'all 0.3s' }} /> : ''}
            />
            <div className={cn(cls.dropdown, (isOpenDropDown && isOpen) ? cls.openDropdown : '')}>
                {children?.length > 0 && children.map(link => (
                    <NavLink
                        key={link.id}
                        className={({ isActive }) => cn(cls.dropdown__link, isActive ? cls.dropdown__link__active : '')}
                        to={link.link}
                    >
                        {link.label}
                    </NavLink>
                ))}
            </div>
        </NavLink>
    );
}

export default SidebarLink;