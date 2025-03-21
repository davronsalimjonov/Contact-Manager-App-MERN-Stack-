import cls from './SalesTeamPlanFulfillmentCard.module.scss';

const SalesTeamPlanFulfillmentCard = ({ onClick }) => {
    
    return (
        <div className={cls.card} onClick={onClick}>
            <img className={cls.card__image} src='/thewolf.png' alt='the wolf' />
            <h2 className={cls.card__title}>“THE WOLF” jamoasi</h2>
            <div className={cls.card__details}>
                <div className={cls.card__details__item}>
                    <span className={cls.card__details__item__label}>Plani</span>
                    <span className={cls.card__details__item__value}>200 000 000 so’m</span>
                </div>
                <div className={cls.card__details__item}>
                    <span className={cls.card__details__item__label}>Kunlik plan</span>
                    <span className={cls.card__details__item__value}>50 000 000 sum</span>
                </div>
                <div className={cls.card__details__item}>
                    <span className={cls.card__details__item__label}>Umumiy sotuv</span>
                    <span className={cls.card__details__item__value}>100 000 000 so’m</span>
                </div>
                <div className={cls.card__details__item}>
                    <span className={cls.card__details__item__label}>Bugungi sotuv</span>
                    <span className={cls.card__details__item__value}>17 000 000 so’m</span>
                </div>
                <div className={cls.card__details__item}>
                    <span className={cls.card__details__item__label}>Konversiya</span>
                    <span className={cls.card__details__item__value}>50%</span>
                </div>
            </div>
        </div>
    );
}

export default SalesTeamPlanFulfillmentCard;