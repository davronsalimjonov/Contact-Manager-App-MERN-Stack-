import { ENGLISH_LEVEL_OPTIONS } from '@/constants/form';
import Select from '../../atoms/Form/Select';
import Button from '../../atoms/Buttons/Button';
import cls from './UserCourseRow.module.scss';

const UserCourseRow = ({
    onClickAddCourse
}) => {
    return (
        <tr className={cls.row}>
            <td>1</td>
            <td>Perfectly Spoken</td>
            <td>12.12.2024</td>
            <td>12.12.2024</td>
            <td>
                <Select 
                    options={ENGLISH_LEVEL_OPTIONS}
                    className={cls.select} 
                    placeholder='Aniqlanmagan'
                />
            </td>
            <td><Button onClick={onClickAddCourse}>Guruh biriktirish</Button></td>
        </tr>
    );
}

export default UserCourseRow;