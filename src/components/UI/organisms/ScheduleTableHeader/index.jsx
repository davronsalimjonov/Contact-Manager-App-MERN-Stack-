import cls from './ScheduleTableHeader.module.scss';
const ScheduleTableHeader = () => {
    return (
        <thead className={cls.head}>
            <tr>
                <th>№</th>
                <th>Ism Familiya</th>
                <th>O'quvchi Vazifasi</th>
                <th>Davomati</th>
            </tr>
        </thead>
    );
}
export default ScheduleTableHeader;