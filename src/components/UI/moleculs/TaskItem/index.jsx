import { cn } from '@/utils/lib';
import { EditIcon, NotificationIcon } from '../../atoms/icons';
import cls from './TaskItem.module.scss';

const TaskItem = ({
    isCompleted = false,
    expired = false
}) => {
    return (
        <div className={cn(cls.item, expired && cls.expired, isCompleted && cls.lineThrough)}>
            <input className={cls.item__checkbox} type="checkbox" disabled={isCompleted} />
            <h3 className={cls.item__title}>A1 guruh o’quvchilariga video chat</h3>
            <span className={cls.item__deadline}>Kecha, 19:13</span>
            <NotificationIcon width={24} height={24} fill={expired ? 'var(--red-color)' : 'var(--dark-gray-700-color)'} />
            <button className={cls.item__edit}><EditIcon width={18} height={18} /></button>
        </div>
    );
}

export default TaskItem;