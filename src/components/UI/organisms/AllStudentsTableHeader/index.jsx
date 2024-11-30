import { FilterIcon } from '../../atoms/icons';
import cls from './AllStudentsTableHeader.module.scss';

const AllStudentsTableHeader = () => {
    return (
        <thead>
            <tr className={cls.students__head}>
                <th className={cls.students__head__th}>№</th>
                <th className={cls.students__head__th}>Inglizchasi</th>
                <th className={cls.students__head__th}>O’zbekchasi</th>
                <th className={cls.students__head__th}>Unitlari</th>
                <th className={cls.students__head__th}>Darajasi</th>
                <th className={cls.students__head__th}>
                    <FilterIcon />
                </th>
            </tr>
        </thead>
    )
}

export default AllStudentsTableHeader;