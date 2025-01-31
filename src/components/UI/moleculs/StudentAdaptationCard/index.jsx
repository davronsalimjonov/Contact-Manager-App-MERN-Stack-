import { BellIcon } from '../../atoms/icons';
import cls from './StudentAdaptationCard.module.scss';

const StudentAdaptationCard = ({
    onClick
}) => {
    return (
        <div className={cls.card} onClick={onClick}>
            <h3 className={cls.card__name}>Diyora Shomamatova</h3>
            <span className={cls.card__phone}>+998 94 257 26 45</span>
            <div className={cls.card__duration}>
                <BellIcon />
                <span>2 soat 12 minut</span>
            </div>
        </div>
    );
}

export default StudentAdaptationCard;