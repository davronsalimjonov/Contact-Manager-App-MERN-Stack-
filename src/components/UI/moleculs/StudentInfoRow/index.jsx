import EmptyDataText from '../../atoms/EmptyDataText';
import cls from './StudentInfoRow.module.scss';

const StudentInfoRow = ({
    icon = <></>,
    label = '',
    value = ''
}) => {
    return (
        <div className={cls.row}>
            <div className={cls.row__label}>
                <div className={cls.row__label__icon}>{icon}</div>
                <span>{label}</span>
            </div>
            <span className={cls.row__value}>{value ? value : <EmptyDataText />}</span>
        </div>
    );
}

export default StudentInfoRow;