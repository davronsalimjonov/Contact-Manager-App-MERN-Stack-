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
                <h2 className={cls.modal__title}>Vazifa nomi</h2>
                <span className={cls.modal__date}>Du, 19:00 gacha</span>
                <div className={cls.modal__description}>
                    Vazifa uchun batafsil tushintirilgan tekst kiritiladi, masalan Perfectly Spoken darsidan A2 darajadagi testlardan har kuni 2 tadan bajarib yubor.
                </div>
            </div>
        </Dialog>
    );
}

export default LessonTaskModal;