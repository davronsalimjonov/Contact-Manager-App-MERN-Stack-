import StudentStatus from '@/components/UI/atoms/StudentStatus';
import cls from './TasksTable.module.scss';

const TasksTable = ({
    tasks = []
}) => {
    return (
        <table className={cls.table}>
            <thead className={cls.table__header}>
                <tr>
                    <th></th>
                    <th>Task: 1</th>
                    <th>O’quvchi</th>
                    <th>Dedline</th>
                    <th>Guruhi</th>
                    <th>Darajasi</th>
                    <th>Statusi</th>
                </tr>
            </thead>
            <tbody className={cls.table__body}>
                <tr>
                    <td><input type="checkbox" /></td>
                    <td>Task nomi</td>
                    <td>Diyora Shomamatova</td>
                    <td>16 oktabr, 2024, 19:13</td>
                    <td>A1(1)</td>
                    <td>A1</td>
                    <td><StudentStatus status='Adaptatsiya' /></td>
                </tr>
            </tbody>
        </table>
    );
}

export default TasksTable;