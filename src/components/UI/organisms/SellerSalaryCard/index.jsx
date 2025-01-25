import cls from './SellerSalaryCard.module.scss';

const SellerSalaryCard = () => {
    return (
        <div className={cls.card}>
            <div className={cls.card__salary}>
                <span className={cls.card__salary__title}>Oylik maoshi</span>
                <span className={cls.card__salary__value}>10 000 000 <span>so’m</span></span>
                <div className={cls.card__salary__icon}>
                </div>
            </div>
            <div></div>
            <div></div>
        </div>
    );
}

export default SellerSalaryCard;