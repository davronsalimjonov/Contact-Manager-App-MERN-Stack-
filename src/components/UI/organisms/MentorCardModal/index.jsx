import { formatPrice } from '@/utils/lib';
import { MENTOR_CARDS_ENUM } from '@/constants/enum';
import Dialog from '../../moleculs/Dialog';
import cls from './MentorCardModal.module.scss';

const getCardTitle = (type) => {
    switch (type) {
        case MENTOR_CARDS_ENUM.FINE: return 'Jarima🙁';
        case MENTOR_CARDS_ENUM.WARNING: return 'Ogohlantirish😐';
        case MENTOR_CARDS_ENUM.BONUS: return 'Bonus🤩';
        default: return '';
    }
}

const getCardColor = (type) => {
    switch (type) {
        case MENTOR_CARDS_ENUM.FINE: return 'rgba(255, 0, 0, 1)';
        case MENTOR_CARDS_ENUM.BONUS: return 'rgba(30, 181, 58, 1)';
        default: return 'var(--black-color)';
    }
}

const getCardIcon = (type) => {
    switch(type){
        case MENTOR_CARDS_ENUM.FINE: return <img className={cls.modal__icon} src="/images/fine-card-icon.svg" alt="" />
        case MENTOR_CARDS_ENUM.BONUS: return <img className={cls.modal__icon} src="/images/bonus-card-icon.svg" alt="" />
        case MENTOR_CARDS_ENUM.WARNING: return <img className={cls.modal__icon} src="/images/warning-icon.svg" alt="" />
        default: return null
    }
}

const MentorCardModal = ({
    type = '',
    amount = '',
    description = '',
    isOpen = false,
    onClose
}) => {
    return (
        <Dialog isOpen={isOpen} onClose={onClose}>
            <div className={cls.modal}>
                {getCardIcon(type)}
                <span className={cls.modal__type}>{getCardTitle(type)}</span>
                {type !== MENTOR_CARDS_ENUM.WARNING && (
                    <div className={cls.modal__sum}>
                        <span className={cls.modal__sum__label}>Summa:</span>
                        <span className={cls.modal__sum__value} style={{ color: getCardColor(type) }}>{formatPrice(amount || 0)} UZS</span>
                    </div>
                )}
                <p className={cls.modal__description}>{description}</p>
            </div>
        </Dialog>
    );
}

export default MentorCardModal;