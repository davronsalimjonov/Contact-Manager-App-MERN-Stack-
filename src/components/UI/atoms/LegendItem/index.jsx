import cls from './LegendItem.module.scss';

const LegendItem = ({
    name = '',
    value = '',
    color = ''
}) => {
    return (
        <div className={cls.legend}>
            <span className={cls.legend__name}><span style={{ backgroundColor: color }}></span>{name}</span>
            <span className={cls.legend__value}>{value}</span>
        </div>
    );
}

export default LegendItem;