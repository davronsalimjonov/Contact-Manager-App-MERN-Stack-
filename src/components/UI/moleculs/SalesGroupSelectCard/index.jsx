import { cn } from '@/utils/lib';
import cls from './SalesGroupSelectCard.module.scss';

const SalesGroupSelectCard = ({ isActive, logoUrl, name, onClick }) => {
    return (
        <div className={cn(cls.card, { [cls.active]: isActive })} onClick={onClick}>
            <img className={cls.card__logo} src={logoUrl} alt={name} />
            <span className={cls.card__name}>“{name}” jamoasi</span>
        </div>
    );
}

export default SalesGroupSelectCard;