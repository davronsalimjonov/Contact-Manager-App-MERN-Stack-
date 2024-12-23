import { useEffect, useState } from "react";
import { socket } from "@/services/socket";
import NotificationToast from "@/components/UI/moleculs/NotificationToast";
import cls from './NotificationProvider.module.scss';

const NOTIFICATION_VISIBLE_TIME = 5000
const NOTIFICATION_HIDE_TIME = 300

const NotificationProvider = ({ children }) => {
    const [notifications, setNotifications] = useState([]);

    const removeNotification = (id) => {
        setNotifications((prev) =>
            prev.map((n) => (n.id === id ? { ...n, isHidden: true } : n))
        );

        setTimeout(() => {
            setNotifications((prev) => prev.filter((n) => n.id !== id));
        }, NOTIFICATION_HIDE_TIME);
    };

    const addNotification = (notification) => {
        setNotifications((prev) => [notification, ...prev]);
        const audio = new Audio('/audio/new-notification-sound.mp3')
        audio.play()

        setTimeout(() => {
            removeNotification(notification.id);
        }, NOTIFICATION_VISIBLE_TIME);
    };

    useEffect(() => {
        if (socket) {
            socket.on('notification-cron', addNotification);
            return () => socket.off("new-notification");
        }
    }, [socket])

    return (
        <div className={cls.provider}>
            <div className={cls.provider__toastList}>
                {notifications?.length > 0 && notifications.map((notification) => (
                    <NotificationToast
                        key={notification?.id}
                        title={notification?.title}
                        hide={notification?.isHidden}
                        onClickClose={() => removeNotification(notification?.id)}
                    />
                ))}
            </div>
            {children}
        </div>
    );
}

export default NotificationProvider;
