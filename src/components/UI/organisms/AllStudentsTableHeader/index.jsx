import { FilterIcon } from '../../atoms/icons';
import cls from './AllStudentsTableHeader.module.scss';

const AllStudentsTableHeader = () => {
    return (
        <thead className={cls.head}>
            <tr >
                <th>№</th>
                <th>Ism familyasi</th>
                <th>Telefon nomer</th>
                <th>Status</th>
                <th>Mentor</th>
                <th>Darajasi</th>
                <th>Kursi</th>
                <th>Ro’yxatdan o’tgan sana</th>
            </tr>
        </thead>
    )
}

export default AllStudentsTableHeader;