import StudentStatus from '@/components/UI/atoms/StudentStatus';
import cls from './GroupStudentsTable.module.scss';

const GroupStudentsTable = () => {
    return (
        <table className={cls.table}>
            <thead>
                <tr>
                    <th>№</th>
                    <th>O’quvchi ismi</th>
                    <th>Statusi</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>1</td>
                    <td>Shomamatova Diyora</td>
                    <td><StudentStatus status='Yangi' /></td>
                </tr>
                <tr>
                    <td>1</td>
                    <td>Shomamatova Diyora</td>
                    <td><StudentStatus status='Yangi' /></td>
                </tr>
                <tr>
                    <td>1</td>
                    <td>Shomamatova Diyora</td>
                    <td><StudentStatus status='Yangi' /></td>
                </tr>
                <tr>
                    <td>1</td>
                    <td>Shomamatova Diyora</td>
                    <td><StudentStatus status='Yangi' /></td>
                </tr>
                <tr>
                    <td>1</td>
                    <td>Shomamatova Diyora</td>
                    <td><StudentStatus status='Yangi' /></td>
                </tr>
                <tr>
                    <td>1</td>
                    <td>Shomamatova Diyora</td>
                    <td><StudentStatus status='Yangi' /></td>
                </tr>
                <tr>
                    <td>1</td>
                    <td>Shomamatova Diyora</td>
                    <td><StudentStatus status='Yangi' /></td>
                </tr>
                <tr>
                    <td>1</td>
                    <td>Shomamatova Diyora</td>
                    <td><StudentStatus status='Yangi' /></td>
                </tr>
                <tr>
                    <td>1</td>
                    <td>Shomamatova Diyora</td>
                    <td><StudentStatus status='Yangi' /></td>
                </tr>
                <tr>
                    <td>1</td>
                    <td>Shomamatova Diyora</td>
                    <td><StudentStatus status='Yangi' /></td>
                </tr>
                <tr>
                    <td>1</td>
                    <td>Shomamatova Diyora</td>
                    <td><StudentStatus status='Yangi' /></td>
                </tr>
                <tr>
                    <td>1</td>
                    <td>Shomamatova Diyora</td>
                    <td><StudentStatus status='Yangi' /></td>
                </tr>
                <tr>
                    <td>1</td>
                    <td>Shomamatova Diyora</td>
                    <td><StudentStatus status='Yangi' /></td>
                </tr>
            </tbody>
        </table>
    );
}

export default GroupStudentsTable;