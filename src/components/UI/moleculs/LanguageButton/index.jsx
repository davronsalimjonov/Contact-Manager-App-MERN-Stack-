import { UzbekistanFlagIcon } from '../../atoms/icons';
import MenuItem from '../MenuItem';
import cls from './LanguageButton.module.scss';

const LanguageButton = ({
    isOpen = false
}) => {
    return (
        <MenuItem 
            className={cls.btn}
            label='Til'
            icon={<UzbekistanFlagIcon />}
            isOpen={isOpen}
        />
    );
}

export default LanguageButton;