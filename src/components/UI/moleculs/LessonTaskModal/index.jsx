import { formatMessageDate, getTimeFromDate } from '@/utils/time';
import { PinBoardUnreaded } from '../../atoms/icons';
import Dialog from '../Dialog';
import cls from './LessonTaskModal.module.scss';

const LessonTaskModal = ({
    isOpen, 
    onClose,
    title = '',
    description = '',
    date = ''
}) => {
    return (
        <Dialog isOpen={isOpen} onClose={onClose}>
            <div className={cls.modal}>
                <div className={cls.modal__icon}>
                    <PinBoardUnreaded />
                </div>
                <h2 className={cls.modal__title}>{title}</h2>
                <span className={cls.modal__date}>{formatMessageDate(date)}, {getTimeFromDate(date)} gacha</span>
                {description && <div className={cls.modal__description}>{description}</div>}
            </div>
        </Dialog>
    );
}

export default LessonTaskModal;