import { formatPrice } from '@/utils/lib';
import { MetricCashIcon, MinusIcon, PlusIcon } from '../../atoms/icons';
import cls from './SellerSalaryCard.module.scss';
import EmptyDataText from '../../atoms/EmptyDataText';

const SellerSalaryCard = ({
    salary = 0,
    profit = 0,
    onClickCash,
    onClickCheck
}) => {
    return (
        <div className={cls.card}>
            <div className={cls.card__salary}>
                <span className={cls.card__salary__title}>Oylik maoshi</span>
                <span className={cls.card__salary__value}>{formatPrice(salary || 0)} <span>so’m</span></span>
                <div className={cls.card__salary__icon}><MetricCashIcon color='rgba(207, 183, 0, 1)' /></div>
            </div>
            <div className={cls.card__moneys}>
                <div>
                    <div>
                        <PlusIcon fill='rgba(30, 181, 58, 1)' width={20} height={20} />
                    </div>
                    <span>{formatPrice(profit || 0)} so’m</span>
                </div>
                <div>
                    <div style={{backgroundColor: 'rgba(255, 240, 240, 1)'}}>
                        <MinusIcon />
                    </div>
                    <span><EmptyDataText /></span>
                </div>
            </div>
            <div className={cls.card__buttons}>
                <button onClick={onClickCash}>Pulni yechib olish</button>
                <button onClick={onClickCheck}>Cheklarim</button>
            </div>
        </div>
    );
}

export default SellerSalaryCard;