import { formatPrice, onImageError } from '@/utils/lib';
import cls from './SalesTeamPlanFulfillmentCard.module.scss';

const SalesTeamPlanFulfillmentCard = ({
    name = '',
    logoUrl = '',
    plan = 0,
    dailyPlan = 0,
    sale = 0,
    dailySale = 0,
    conversion = 0,
    onClick 
}) => {
    
    return (
        <div className={cls.card} onClick={onClick}>
            <img className={cls.card__image} src={logoUrl} onError={onImageError} alt='the wolf' />
            <h2 className={cls.card__title}>“{name}” jamoasi</h2>
            <div className={cls.card__details}>
                <div className={cls.card__details__item}>
                    <span className={cls.card__details__item__label}>Plani</span>
                    <span className={cls.card__details__item__value}>{formatPrice(plan)} so’m</span>
                </div>
                <div className={cls.card__details__item}>
                    <span className={cls.card__details__item__label}>Kunlik plan</span>
                    <span className={cls.card__details__item__value}>{formatPrice(dailyPlan)} sum</span>
                </div>
                <div className={cls.card__details__item}>
                    <span className={cls.card__details__item__label}>Umumiy sotuv</span>
                    <span className={cls.card__details__item__value}>{formatPrice(sale)} so’m</span>
                </div>
                <div className={cls.card__details__item}>
                    <span className={cls.card__details__item__label}>Bugungi sotuv</span>
                    <span className={cls.card__details__item__value}>{formatPrice(dailySale)} so’m</span>
                </div>
                <div className={cls.card__details__item}>
                    <span className={cls.card__details__item__label}>Konversiya</span>
                    <span className={cls.card__details__item__value}>{conversion}%</span>
                </div>
            </div>
        </div>
    );
}

export default SalesTeamPlanFulfillmentCard;