import dayjs from 'dayjs';
import { useRef, useState } from 'react';
import { cn, getUserFullName } from '@/utils/lib';
import { ENGLISH_LEVEL_OPTIONS } from '@/constants/form';
import { useGetMentorsForOptions } from '@/hooks/useMentor';
import UserCourseSaleHistoryTable from '@/components/templates/UserCourseSaleHistoryTable';
import Select from '../../atoms/Form/Select';
import Button from '../../atoms/Buttons/Button';
import { ArrowDown, EditIcon } from '../../atoms/icons';
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
    reSales = [],
    onClickAddCourse,
    onLevelChange,
    onChangeCallMentor,
    onClickEdit
}) => {
    const historyTableRef = useRef(null)
    const [isOpenHistory, setIsOpenHistory] = useState(false)
    const { callMentors: { data: callMentors } } = useGetMentorsForOptions()
    const mentorOptions = callMentors?.map(mentor => ({ value: mentor.id, label: getUserFullName(mentor) }))

    return (
        <div className={cn(cls.row, disabled && cls.disabled)}>
            <span>{index}</span>
            <span>{courseName}</span>
            <span>{dayjs(startDate).format('DD.MM.YYYY')}</span>
            <span>{dayjs(endDate).format('DD.MM.YYYY')}</span>
            <span>
                <Select
                    disabled={disabled}
                    className={cls.select}
                    defaultValue={ENGLISH_LEVEL_OPTIONS.find(option => option.value === level)}
                    options={ENGLISH_LEVEL_OPTIONS}
                    placeholder='Aniqlanmagan'
                    onChange={onLevelChange}
                />
            </span>
            <span>
                <Select
                    key={mentorOptions?.length}
                    disabled={disabled}
                    className={cls.select}
                    options={mentorOptions}
                    defaultValue={mentorOptions?.find(option => option.value === callMentor)}
                    placeholder='Aniqlanmagan'
                    onChange={onChangeCallMentor}
                />
            </span>
            <span>{hasGroup ? group : <Button disabled={!level || disabled} onClick={onClickAddCourse}>Guruh biriktirish</Button>}</span>
            <span><button onClick={onClickEdit}><EditIcon /></button></span>
            {reSales?.length > 0 ? (
                <button
                    className={cls.row__button}
                    onClick={() => setIsOpenHistory(state => !state)}
                    style={{ transform: isOpenHistory ? 'rotate(180deg)' : 'rotate(0deg)' }}
                    disabled={reSales?.length == 0}
                >
                    <ArrowDown fill='var(--blue-color)' />
                </button>
            ) : (
                <span></span>
            )}
            <div
                ref={historyTableRef}
                className={cls.accordion}
                style={{ height: isOpenHistory ? historyTableRef?.current?.scrollHeight : '0' }}
            >
                <UserCourseSaleHistoryTable items={reSales} />
            </div>
        </div>
    );
}

export default UserCourseRow;