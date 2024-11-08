import DropdownMenuItem from '../../atoms/DropdownMenuItem';
import cls from './DropdownMenu.module.scss';

const DropdownMenu = () => {
    return (
        <div className={cls.menu}>
            <button className={cls.menu__item}>O’quvchi ma’lumotlari</button>
            <button className={cls.menu__item}>Transfer student</button>
        </div>
    );
}

export default DropdownMenu;