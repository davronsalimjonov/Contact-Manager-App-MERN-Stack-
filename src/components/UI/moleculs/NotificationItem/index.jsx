import { cn } from '@/utils/lib';
import { useInView } from 'react-intersection-observer';
import { formatMessageDate, getTimeFromDate } from '@/utils/time';
import { MessageIcon } from '../../atoms/icons';
import cls from './NotificationItem.module.scss';

const NotificationItem = ({
    title = '',
    date = '',
    decription = '',
    isViewed = false,
    onVisible
}) => {
    const { ref } = useInView({ 
        threshold: 1, 
        triggerOnce: true, 
        skip: isViewed, 
        onChange: visible => visible && onVisible() 
    });

    return (
        <div className={cn(cls.item, !isViewed && cls.unreaded)} ref={ref}>
            <div className={cls.item__icon}>
                <MessageIcon />
            </div>
            <div className={cls.item__details}>
                <h5 className={cls.item__details__title}>{title}</h5>
                {decription && <span className={cls.item__details__description}>{decription}</span>}
            </div>
            <span className={cls.item__details__time}>{formatMessageDate(date, { month: 'short' })}, {getTimeFromDate(date)}</span>
        </div>
    );
}

export default NotificationItem;