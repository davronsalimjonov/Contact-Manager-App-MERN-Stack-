import { cn, formatPrice, onImageError } from '@/utils/lib';
import { EditIcon, PlusIcon } from '../../atoms/icons';
import cls from './SalesGroupCard.module.scss';

const SalesGroupCard = ({
    title = '',
    logoUrl = '',
    plan = 0,
    isActive = false,
    onClick,
    onClickEdit
}) => {
    return (
        <div className={cn(cls.card, { [cls.active]: isActive })} onClick={onClick}>
            <div className={cls.card__controls}>
                <button><PlusIcon fill='var(--blue-gray-600-color)' width={20} height={20} /></button>
                <button onClick={onClickEdit}><EditIcon fill='var(--blue-gray-600-color)' width={20} height={20} /></button>
            </div>
            <img className={cls.card__logo} src={logoUrl} alt={title} onError={onImageError} />
            <h2 className={cls.card__title}>“{title}” jamoasi</h2>
            {plan > 0 && <div className={cls.card__plan}>
                <span className={cls.card__plan__label}>Plan:</span>
                <span className={cls.card__plan__value}>{formatPrice(plan)}</span>
            </div>}
        </div>
    );
}

export default SalesGroupCard;