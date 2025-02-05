import { useState } from 'react';
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
    const [isLoading, setIsLoading] = useState(false)

    const handleConfirm = async () => {
        try {
            setIsLoading(true)
            await onConfirm?.()
            onClose?.()       
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Dialog isOpen={isOpen} onClose={onClose}>
            <div className={cls.modal}>
                <h3 className={cls.modal__title}>{title}</h3>
                <div className={cls.modal__buttons}>
                    <Button onClick={handleConfirm} isLoading={isLoading}>Ha</Button>
                    <Button className={cls.modal__buttons__reject} onClick={onCancel}>Yo’q</Button>
                </div>
            </div>
        </Dialog>
    );
}

export default ConfirmationModal;