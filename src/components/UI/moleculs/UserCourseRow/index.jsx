import dayjs from 'dayjs';
import { cn } from '@/utils/lib';
import { ENGLISH_LEVEL_OPTIONS } from '@/constants/form';
import Select from '../../atoms/Form/Select';
import Button from '../../atoms/Buttons/Button';
import cls from './UserCourseRow.module.scss';
import { EditIcon } from '../../atoms/icons';

const UserCourseRow = ({
    index = 0,
    disabled = true,
    courseName = '',
    startDate = '',
    endDate = '',
    level = '',
    group = '',
    hasGroup = false,
    onClickAddCourse,
    onLevelChange,
}) => {
    return (
        <tr className={cn(cls.row, disabled && cls.disabled)}>
            <td>{index}</td>
            <td>{courseName}</td>
            <td>{dayjs(startDate).format('DD.MM.YYYY')}</td>
            <td>{dayjs(endDate).format('DD.MM.YYYY')}</td>
            <td>
                <Select
                    disabled={disabled}
                    className={cls.select}
                    defaultValue={ENGLISH_LEVEL_OPTIONS.find(option => option.value === level)}
                    options={ENGLISH_LEVEL_OPTIONS}
                    placeholder='Aniqlanmagan'
                    onChange={onLevelChange}
                />
            </td>
            <td>{hasGroup ? group : <Button disabled={!level || disabled} onClick={onClickAddCourse}>Guruh biriktirish</Button>}</td>
            <td><button><EditIcon /></button></td>
        </tr>
    );
}

export default UserCourseRow;