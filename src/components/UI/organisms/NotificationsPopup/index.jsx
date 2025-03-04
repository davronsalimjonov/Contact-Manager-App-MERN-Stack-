import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { debounce } from '@/utils/lib';
import EmptyData from '../EmptyData';
import NotificationItem from '../../moleculs/NotificationItem';
import cls from './NotificationsPopup.module.scss';

const NotificationsPopup = ({
    notifications = [],
    onNotificationsViewed,
    handleClose
}) => {
    const navigate = useNavigate()
    const notificationIds = useRef([])

    const debounceOnNotificationsViewed = debounce((ids) => {
        onNotificationsViewed?.(ids)
        notificationIds.current = []
    })

    const handleNotificationsViewed = (notificationId) => {
        if (!notificationIds.current.includes(notificationId)) {
            notificationIds.current.push(notificationId)
        }
        debounceOnNotificationsViewed(notificationIds.current)
    }

    const handleClickNotification = (notification) => {
        if(notification?.type === 'time-is-up') {
            navigate(`/students/${notification?.typeId}`)
            handleClose?.()
        } else if(notification?.type === 'adaptation') {
            navigate('/adaptation-workspace')
            handleClose?.()
        } else if(notification?.type === 'adaptation-notification') {
            navigate(`/students/${notification?.typeId}`)
            handleClose?.()
        }
    }

    return (
        <div className={cls.popup}>
            <h4 className={cls.popup__title}>Bildirishnomalar</h4>
            <div>
                {notifications?.length > 0 ? (
                    <div className={cls.popup__items}>
                        {notifications.map(notification => (
                            <NotificationItem
                                key={notification?.id}
                                title={notification?.title}
                                date={notification?.date}
                                isViewed={notification?.isViewed}
                                onClick={() => handleClickNotification(notification)}
                                onVisible={() => handleNotificationsViewed(notification?.id)}
                            />
                        ))}
                    </div>
                ) : (
                    <EmptyData text='Bildirishnomalar mavjud emas' />
                )}
            </div>
        </div>
    );
}

export default NotificationsPopup;