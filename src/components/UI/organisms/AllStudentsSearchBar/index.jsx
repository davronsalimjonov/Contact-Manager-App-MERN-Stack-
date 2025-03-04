import { useGetCourses } from '@/hooks/useUserCourse';
import { debounce, getUserFullName } from '@/utils/lib';
import { useGetGroupsForOptions } from '@/hooks/useGroups';
import { useGetMentorsForOptions } from '@/hooks/useMentor';
import { DEGREEOPTIONS, STUDENTS_STATUS_OPTIONS } from '@/constants';
import Input from '../../atoms/Form/Input';
import Select from '../../atoms/Form/Select';
import PhoneInput from '../../atoms/Form/PhoneInput';
import cls from './AllStudentsSearchBar.module.scss';

const AllStudentsSearchBar = ({
    onChangeFirstName,
    onChangeLastName,
    onChangePhone,
    onChangeMentor,
    onChangeStatus,
    onChangeDegree,
    onChangeCourse,
    onChangeGroup
}) => {
    const { data: courses } = useGetCourses();
    const { data: groups } = useGetGroupsForOptions()
    const { mainMentors: { data: mainMentors } } = useGetMentorsForOptions()
    const groupsOptions = groups?.map(group => ({value: group?.id, label: group?.title}))
    const coursesOptions = courses?.map(course => ({ value: course.id, label: course.title }))
    const mainMentorOptions = mainMentors?.map(mentor => ({ value: mentor.id, label: getUserFullName(mentor) })) || []

    return (
        <div className={cls.bar}>
            <Input
                placeholder='Ism'
                className={cls.bar__form__input}
                onChange={debounce(onChangeFirstName, 200)}
            />
            <Input
                placeholder='Familiya'
                className={cls.bar__form__input}
                onChange={debounce(onChangeLastName, 200)}
            />
            <PhoneInput
                placeholder='Telefon raqam'
                className={cls.bar__form__input}
                onChange={debounce(onChangePhone, 200)}
            />
            <Select
                placeholder='Mentor'
                className={cls.bar__form__select}
                options={mainMentorOptions}
                onChange={onChangeMentor}
                isclearable
            />
            <Select
                placeholder='Status user'
                className={cls.bar__form__select}
                options={STUDENTS_STATUS_OPTIONS}
                onChange={onChangeStatus}
                isclearable
            />
            <Select
                placeholder='Darajasi'
                className={cls.bar__form__select}
                options={DEGREEOPTIONS}
                onChange={onChangeDegree}
                isclearable
            />
            <Select
                placeholder='Kurs'
                className={cls.bar__form__select}
                options={coursesOptions}
                onChange={onChangeCourse}
                isclearable
            />
            <Select
                placeholder='Guruh'
                className={cls.bar__form__select}
                options={groupsOptions}
                onChange={onChangeGroup}
                isclearable
            />
        </div>
    );
}

export default AllStudentsSearchBar;