import { useState } from 'react';
import Dialog from '../../moleculs/Dialog';
import { CloseIcon } from '../../atoms/icons';
import Button from '../../atoms/Buttons/Button';
import FormRadioGroup from '../../moleculs/Form/FormRadioGroup';
import cls from './ConfirmScheduleMoveModal.module.scss';

const ConfirmScheduleMoveModal = ({
    isOpen,
    onClose,
    onConfirm,
}) => {
    const [type, setType] = useState('temp')
    const [isLoading, setIsLoading] = useState(false)
    const title = type === 'temp' ? 'Ushbu darsni shu hafta uchun ko’chirishni xohlaysizmi?' : 'Ushbu darsni doimiy ko’chirishni xohlaysizmi?'

    const handleConfirm = async () => {
        try {
            setIsLoading(true)
            await onConfirm?.(type)
        } finally {
            setIsLoading(false)
        }
    }

    const handleClose = () => {
        setType('temp')
        onClose?.()
    }

    return (
        <Dialog isOpen={isOpen} onClose={handleClose}>
            <div className={cls.modal}>
                <button className={cls.modal__close} onClick={handleClose}><CloseIcon /></button>
                <h3 className={cls.modal__title}>{title}</h3>
                <FormRadioGroup
                    name='type'
                    onChange={e => setType(e.target.value)}
                    options={[
                        { value: 'temp', label: 'Shu hafta uchun ', defaultChecked: true },
                        { value: 'permanent', label: 'Doimiy' }
                    ]}
                />
                <Button onClick={handleConfirm} isLoading={isLoading}>Saqlash</Button>
            </div>
        </Dialog>
    );
}

export default ConfirmScheduleMoveModal;