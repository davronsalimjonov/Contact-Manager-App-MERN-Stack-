import { useRef } from 'react';
import { debounce } from '@/utils/lib';
import EmptyData from '../EmptyData';
import NotificationItem from '../../moleculs/NotificationItem';
import cls from './NotificationsPopup.module.scss';

const NotificationsPopup = ({
    notifications = [],
    onNotificationsViewed
}) => {
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
                                date={notification?.createdAt}
                                isViewed={notification?.isViewed}
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