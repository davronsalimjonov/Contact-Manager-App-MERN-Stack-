import { useEffect, useState } from 'react';
import { usePopper } from 'react-popper';
import { cn } from '@/utils/lib';
import useClickOutside from '@/hooks/useClickOutside';
import { useGetNotificationCount, useGetNotifications } from '@/hooks/useNotification';
import { NotificationIcon } from '../../atoms/icons';
import NotificationsPopup from '../NotificationsPopup';
import cls from './NotificationButton.module.scss';
import { socket } from '@/services/socket';

const NotificationButton = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [isOpenPopup, setIsOpenPopup] = useState(false);
    const ref = useClickOutside({ onClickOutside: handleClickOutside })
    const [popperEl, setPopperEl] = useState(null);
    const [referenceEl, setReferenceEl] = useState(null);
    const { styles, attributes } = usePopper(referenceEl, popperEl, {
        placement: 'bottom-end',
        modifiers: [
            {
                name: 'offset',
                options: {
                    offset: [0, 8],
                },
            },
        ],
    });
    const { data: notificationCount } = useGetNotificationCount()
    const { data: notifications, addNewNotification } = useGetNotifications({ enabled: notificationCount > 0 })

    function handleClickOutside() {
        setIsOpenPopup(false);
        setTimeout(() => setIsVisible(false), 300);
    }

    function togglePopup() {
        if (isOpenPopup) {
            setIsOpenPopup(false);
            setTimeout(() => setIsVisible(false), 300);
        } else {
            setIsVisible(true);
            setTimeout(() => setIsOpenPopup(true), 0);
        }
    };

    const onNotificationsViewed = (ids) => {
        console.log(ids);
    }

    useEffect(() => {
        if(socket){
            socket.on('notification-cron', addNewNotification)
        }
    }, [socket])

    return (
        <div ref={ref} style={{ position: 'relative', zIndex: 1000 }}>
            <button className={cls.btn} ref={setReferenceEl} onClick={togglePopup}>
                <NotificationIcon />
                <span className={cls.btn__badge}>{notificationCount}</span>
            </button>
            {isVisible &&
                <div className={cn(cls.popup, isOpenPopup && cls.open)} ref={setPopperEl} style={styles.popper} {...attributes.popper}>
                    <NotificationsPopup
                        notifications={notifications}
                        onNotificationsViewed={onNotificationsViewed}
                    />
                </div>
            }
        </div>
    );
}

export default NotificationButton;