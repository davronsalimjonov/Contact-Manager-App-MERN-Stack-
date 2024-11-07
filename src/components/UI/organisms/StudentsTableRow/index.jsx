import StudentStatus from '../../atoms/StudentStatus';
import cls from './StudentsTableRow.module.scss';

const StudentsTableRow = () => {
    return (
        <tr className={cls.row}>
            <td>1</td>
            <td>Shomamatova Diyora</td>
            <td>Du, Cho, Ju</td>
            <td>19:00 - 20:30</td>
            <td>+9989 93 733 32 45</td>
            <td><StudentStatus /></td>
            <td>act</td>
        </tr>
    );
}

export default StudentsTableRow;