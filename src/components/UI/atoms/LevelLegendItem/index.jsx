import cls from './LevelLegendItem.module.scss';

const LevelLegendItem = ({
    level = '',
    count = '',
    color = '',
    backgroundColor = '',
    borderColor = ''
}) => {
    return (
        <div className={cls.legend}>
            <span className={cls.legend__name}>
                <span style={{ backgroundColor: color }}></span> {level}
            </span>
            <div className={cls.legend__value} style={{ backgroundColor, borderColor }}>
                <span style={{ color }}>{count}</span>
            </div>
        </div>
    );
}

export default LevelLegendItem;