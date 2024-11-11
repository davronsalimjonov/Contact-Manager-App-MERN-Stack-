import { useNavigate } from 'react-router-dom';
import StudentStatus from '../../atoms/StudentStatus';
import TableActionButton from '../../moleculs/TableActionButton';
import cls from './StudentsTableRow.module.scss';

const StudentsTableRow = ({

}) => {
    const navigate = useNavigate()
    
    const dropdownMenuItems = [
        { label: 'O’quvchi ma’lumotlari', onClick: () => navigate('1') },
        { label: 'Transfer student' },
    ]

    return (
        <tr className={cls.row}>
            <td>10</td>
            <td>Shomamatova Diyora</td>
            <td>Du, Cho, Ju</td>
            <td>19:00 - 20:30</td>
            <td>
                <span title='+9989 93 733 32 45'>+9989 93 733 32 45</span>
            </td>
            <td>
                <StudentStatus />
            </td>
            <td>
                <TableActionButton menuItems={dropdownMenuItems} />
            </td>
        </tr>
    );
}

export default StudentsTableRow;