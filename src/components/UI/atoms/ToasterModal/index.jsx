import toast from 'react-hot-toast';
import { CloseToastIcon } from '../icons';
import cls from './ToasterModal.module.scss';

const ToasterModal = ({ 
    toastId, 
    message = '',
}) => {
    return (
        <div className={cls.toast}>
            <span className={cls.toast__text}>{message}</span>
            <button className={cls.toast__btn} onClick={() => toast.dismiss(toastId)}>
                <CloseToastIcon />
            </button>
        </div>
    );
}

export default ToasterModal;