import { NotificationIcon } from '../../atoms/icons';
import cls from './NotificationButton.module.scss';

const NotificationButton = () => {
    return (
        <button className={cls.btn}>
            <NotificationIcon />
        </button>
    );
}

export default NotificationButton;