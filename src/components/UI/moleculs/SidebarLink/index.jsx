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
    children,
    onClick
}) => {
    const [isOpenDropDown, setIsOpenDropdown] = useState(false)
    const hasChildren = children?.length > 0
    return (
        <NavLink 
            to={hasChildren ? children[0]?.link : to} 
            className={({ isActive }) => cn(cls.link, isActive ? cls.active : '')}
            onClick={onClick}
        >
            <MenuItem
                onClick={hasChildren ? () => setIsOpenDropdown(state => !state) : undefined}
                className={''}
                label={label}
                icon={icon}
                isOpen={isOpen}
                preffix={hasChildren && <RightArrowIcon style={{ transform: isOpenDropDown ? 'rotate(-90deg)' : 'rotate(90deg)', transition: 'all 0.3s' }} />}
            />
            {hasChildren && (
                <div className={cn(cls.dropdown, (isOpenDropDown && isOpen) ? cls.openDropdown : '')}>
                    {children.map(link => (
                        <NavLink
                            key={link.id}
                            className={({ isActive }) => cn(cls.dropdown__link, isActive ? cls.dropdown__link__active : '')}
                            to={link.link}
                        >
                            {link.label}
                        </NavLink>
                    ))}
                </div>
            )}
        </NavLink>
    );
}

export default SidebarLink;