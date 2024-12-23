import { InfoIcon } from '../../atoms/icons';
import NotificationToastWrapper from '../NotificationToastWrapper';
import cls from './NotificationToast.module.scss';

const NotificationToast = ({
    onClickClose,
    hide = false,
    title = ''
}) => {
    return (
        <NotificationToastWrapper onClickClose={onClickClose} hide={hide}>
            <div className={cls.toast}>
                <div className={cls.toast__icon}><InfoIcon /></div>
                <h3 className={cls.toast__title}>{title}</h3>
            </div>
        </NotificationToastWrapper>
    );
}

export default NotificationToast;