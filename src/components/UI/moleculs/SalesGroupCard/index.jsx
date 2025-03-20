import { EditIcon, PlusIcon } from '../../atoms/icons';
import cls from './SalesGroupCard.module.scss';

const SalesGroupCard = () => {
    return (
        <div className={cls.card}>
            <div className={cls.card__controls}>
                <button><PlusIcon fill='var(--blue-gray-600-color)' width={20} height={20} /></button>
                <button><EditIcon fill='var(--blue-gray-600-color)' width={20} height={20} /></button>
            </div>
            <img className={cls.card__logo} src="/thewolf.png" alt="" />
            <h2 className={cls.card__title}>“THE WOLF” jamoasi</h2>
            <div className={cls.card__plan}>
                <span className={cls.card__plan__label}>Plan:</span>
                <span className={cls.card__plan__value}>100 000 000</span>
            </div>
        </div>
    );
}

export default SalesGroupCard;