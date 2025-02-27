import Dialog from '../../moleculs/Dialog';
import FormDatepicker from '../../moleculs/Form/FormDatepicker';
import FormInput from '../../moleculs/Form/FormInput';
import cls from './ReminderFormModal.module.scss';

const ReminderFormModal = ({
    isOpen = false,
    onClose,
}) => {
    return (
        <Dialog isOpen={isOpen} onClose={onClose}>
            <form className={cls.form}>
                <h2 className={cls.form__title}>Task biriktirish</h2>
                <FormInput 
                    label='Task nomi'
                    placeholder='Task nomi'
                />
                <FormDatepicker 
                    label='Vaqti'
                    showTimeInput
                />
            </form>
        </Dialog>
    );
}

export default ReminderFormModal;