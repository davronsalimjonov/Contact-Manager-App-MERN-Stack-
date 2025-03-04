import Avatar from 'react-avatar';
import Dialog from '../../moleculs/Dialog';
import { StarIcon } from '../../atoms/icons';
import cls from './ServiceRatePreviewModal.module.scss';

const ServiceRatePreviewModal = ({
    isOpen,
    onClose,
    avatar,
    fullName,
    rating,
    comments = []
}) => {
    return (
        <Dialog isOpen={isOpen} onClose={onClose}>
            <div className={cls.modal}>
                <div className={cls.modal__user}>
                    <Avatar src={avatar} name={fullName} size='36' round />
                    <span>{fullName}</span>
                </div>
                <div className={cls.modal__rating}>
                    <StarIcon /> {rating}
                </div>
                <div className={cls.modal__description}>
                    <span>Izoh</span>
                    <ul>
                        {comments.map((comment, index) => (
                            <li key={index}>{comment}</li>
                        ))}
                    </ul>
                </div> 
            </div>
        </Dialog>
    );
}

export default ServiceRatePreviewModal;