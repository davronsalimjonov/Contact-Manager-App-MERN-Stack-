import UserCourseRow from '../../moleculs/UserCourseRow';
import cls from './UserCourseTable.module.scss';

const UserCourseTable = () => {
    return (
        <div className={cls.card}>
            <h3 className={cls.card__title}>Kurs</h3>
            <table className={cls.card__table}>
                <thead>
                    <tr>
                        <th>№</th>
                        <th>Kurs nomi</th>
                        <th>Sotib olgan sana</th>
                        <th>Tugash sanasi</th>
                        <th>Darajasi</th>
                        <th>Guruh</th>
                    </tr>
                </thead>
                <tbody>
                    <UserCourseRow />
                </tbody>
            </table>
        </div>
    );
}

export default UserCourseTable;