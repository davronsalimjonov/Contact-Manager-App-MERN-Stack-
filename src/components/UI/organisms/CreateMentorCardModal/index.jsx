import Dialog from '../../moleculs/Dialog';
import cls from './CreateMentorCardModal.module.scss';

const CreateMentorCardModal = ({
    isOpen = false,
    onClose
}) => {
    return (
        <Dialog isOpen={isOpen} onClose={onClose}>
            <form className={cls.form}>

            </form>
        </Dialog>
    );
}

export default CreateMentorCardModal;