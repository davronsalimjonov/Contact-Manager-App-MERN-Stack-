import cls from './ScheduleTableHeader.module.scss';
const ScheduleTableHeader = () => {
    return (
        <thead className={cls.head}>
            <tr>
                <th>Darajasi</th>
                <th>Sanasi</th>
                <th>Vaqti</th>
                <th></th>
            </tr>
        </thead>
    );
}
export default ScheduleTableHeader;