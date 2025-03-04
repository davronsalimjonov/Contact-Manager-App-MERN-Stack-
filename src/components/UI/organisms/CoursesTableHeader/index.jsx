import { FilterIcon, SettingsIcon } from '../../atoms/icons';
import cls from './CoursesTableHeader.module.scss';

const CoursesTableHeader = () => {
    return (
        <thead className={cls.head}>
            <tr >
                <th>№</th>
                <th>Kurs nomi</th>
                <th>Sotib olgan Sanasi</th>
                <th>Tugash sanasi</th>
                <th><SettingsIcon/></th>
            </tr>
        </thead>
    )
}

export default CoursesTableHeader;