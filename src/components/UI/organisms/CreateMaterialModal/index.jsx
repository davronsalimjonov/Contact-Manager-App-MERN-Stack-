import Button from '../../atoms/Buttons/Button';
import Dialog from '../../moleculs/Dialog';
import FormInput from '../../moleculs/Form/FormInput';
import FormTextArea from '../../moleculs/Form/FormTextArea';
import cls from './CreateMaterialModal.module.scss';

const CreateMaterialModal = ({
    isOpen,
    onClose
}) => {
    return (
        <Dialog 
            isOpen={isOpen}
            onClose={onClose}
        >
            <form className={cls.form}>
                <FormInput 
                    label='Sarlavha'
                    placeholder='Sarlavha'
                />
                <FormTextArea 
                    label='Description'
                    placeholder='Description kiriting'
                />
                <Button>Qo’shish</Button>
            </form>
        </Dialog>
    );
}

export default CreateMaterialModal;