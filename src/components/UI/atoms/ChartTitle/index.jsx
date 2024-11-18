import cls from './ChartTitle.module.scss';

const ChartTitle = ({children}) => {
    return (
        <h3 className={cls.title}>{children}</h3>
    );
}

export default ChartTitle;