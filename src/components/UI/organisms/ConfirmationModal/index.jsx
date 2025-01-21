import Button from '../../atoms/Buttons/Button';
import Dialog from '../../moleculs/Dialog';
import cls from './ConfirmationModal.module.scss';

const ConfirmationModal = ({
    title = 'Rostan ham ushbu materialni o’chirishni xohlaysizmi?',
    isOpen,
    onClose,
    onConfirm, 
    onCancel
}) => {
    return (
        <Dialog isOpen={isOpen} onClose={onClose}>
            <div className={cls.modal}>
                <h3 className={cls.modal__title}>{title}</h3>
                <div className={cls.modal__buttons}>
                    <Button onClick={onConfirm}>Ha</Button>
                    <Button className={cls.modal__buttons__reject} onClick={onCancel}>Yo’q</Button>
                </div>
            </div>
        </Dialog>
    );
}

export default ConfirmationModal;