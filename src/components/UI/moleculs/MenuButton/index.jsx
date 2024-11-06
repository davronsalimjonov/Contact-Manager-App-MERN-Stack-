import { cn } from '@/utils/lib';
import MenuItem from '../MenuItem';
import { DirectionLeftIcon } from '../../atoms/icons';
import cls from './MenuButton.module.scss';

const MenuButton = ({
    className = '',
    isOpen = false,
    onClick,
}) => {
    return (
        <MenuItem 
            onClick={onClick}
            className={cn(cls.btn, className, !isOpen && cls.rotate)}
            label='Menu'
            icon={<DirectionLeftIcon />}
            isOpen={isOpen}
        />
    );
}

export default MenuButton;