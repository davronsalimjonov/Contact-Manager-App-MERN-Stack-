import { WEEKDAY_OPTIONS } from '@/constants/form';
import Dialog from '../../moleculs/Dialog';
import FormSelect from '../../moleculs/Form/FormSelect';
import cls from './CreateScheduleFormModal.module.scss';
import Button from '../../atoms/Buttons/Button';
import { CloseIcon } from '../../atoms/icons';

const CreateScheduleFormModal = ({
    isOpen,
    onClose
}) => {
    return (
        <Dialog isOpen={isOpen} onClose={onClose}>
            <form className={cls.form}>
                <div className={cls.form__header}>
                    <span className={cls.form__header__title}>Dars jadval qo’shish</span>
                    <button type='button' onClick={onClose}><CloseIcon /></button>
                </div>
                <FormSelect
                    label='Hafta kunini tanlang'
                    placeholder='Tanlang'
                    options={WEEKDAY_OPTIONS}
                />
                <FormSelect
                    label='Start time'
                    placeholder='Tanlang'
                />
                <FormSelect
                    label='End time'
                    placeholder='Tanlang'
                />
                <Button type='submit'>Qo’shish</Button>
            </form>
        </Dialog>
    );
}

export default CreateScheduleFormModal;