import Dialog from '../../moleculs/Dialog';
import cls from './CommingSoomModal.module.scss';

const CommingSoomModal = ({
    isOpen,
    onClose
}) => {
    return (
        <Dialog isOpen={isOpen} onClose={onClose}>
            <div className={cls.modal}>
                <img
                    className={cls.modal__image} 
                    src="/images/comming_soon.svg" 
                    alt="" 
                />
                <h2 className={cls.modal__title}>Tez orada ishga tushadi</h2>
            </div>
        </Dialog>
    );
}

export default CommingSoomModal;