import dayjs from 'dayjs';
import { cn, getUserFullName } from '@/utils/lib';
import { ENGLISH_LEVEL_OPTIONS } from '@/constants/form';
import { useGetMentorsForOptions } from '@/hooks/useMentor';
import Select from '../../atoms/Form/Select';
import Button from '../../atoms/Buttons/Button';
import { EditIcon } from '../../atoms/icons';
import cls from './UserCourseRow.module.scss';

const UserCourseRow = ({
    index = 0,
    disabled = true,
    courseName = '',
    startDate = '',
    endDate = '',
    level = '',
    group = '',
    callMentor,
    hasGroup = false,
    onClickAddCourse,
    onLevelChange,
    onChangeCallMentor,
    onClickEdit
}) => {
    const { callMentors: { data: callMentors } } = useGetMentorsForOptions()
    const mentorOptions = callMentors?.map(mentor => ({ value: mentor.id, label: getUserFullName(mentor) }))

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
            <td>
                <Select
                    key={mentorOptions?.length}
                    disabled={disabled}
                    className={cls.select}
                    options={mentorOptions}
                    defaultValue={mentorOptions?.find(option => option.value === callMentor)}
                    placeholder='Aniqlanmagan'
                    onChange={onChangeCallMentor}
                />
            </td>
            <td>{hasGroup ? group : <Button disabled={!level || disabled} onClick={onClickAddCourse}>Guruh biriktirish</Button>}</td>
            <td><button onClick={onClickEdit}><EditIcon /></button></td>
        </tr>
    );
}

export default UserCourseRow;