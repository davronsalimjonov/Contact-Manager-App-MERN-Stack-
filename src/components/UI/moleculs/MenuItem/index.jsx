import { HouseIcon } from '../../atoms/icons';
import cls from './MenuItem.module.scss';

const MenuItem = () => {
    return (
        <div className={cls.item}>
            <div className={cls.item__icon}>
                <HouseIcon />
            </div>
            <span className={cls.item__label}>Dashboard</span>
        </div>
    );
}

export default MenuItem;