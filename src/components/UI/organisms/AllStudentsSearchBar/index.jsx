import { debounce } from '@/utils/lib';
import { DEGREEOPTIONS, STUDENT_STATUS_ENUMS, STUDENTS_STATUS_OPTION } from '@/constants';
import Input from '../../atoms/Form/Input';
import Select from '../../atoms/Form/Select';
import cls from './AllStudentsSearchBar.module.scss';
import useGetCourses from '@/hooks/useGetCourses';
import Button from '../../atoms/Buttons/Button';
import { PlusIcon } from '../../atoms/icons';

const AllStudentsSearchBar = ({
    onChangeStatus,
    onChangeName,
    onChangeDegree,
    onChangeCourse
}) => {
    const { data: courses } = useGetCourses();

    return (
        <div className={cls.bar}>
            <Input
                placeholder='Qidirish'
                className={cls.bar__form__input}
                onChange={debounce(onChangeName, 200)}
            />

            <Select
                className={cls.bar__form__select}
                placeholder='Status user'
                options={STUDENTS_STATUS_OPTION}
                onChange={onChangeStatus}
                isClearable
            />

            <Select
                className={cls.bar__form__select}
                placeholder='Darajasi'
                options={DEGREEOPTIONS}
                onChange={onChangeDegree}
                isClearable
            />
            <Select
                className={cls.bar__form__select}
                placeholder='Kurslar bo’yicha'
                options={courses?.map(course => ({ value: course.id, label: course.title }))}
                onChange={onChangeCourse}
                isClearable
            />

            <Button type='button' pr>O'quvchi qo'shish <PlusIcon/></Button>
        </div>
    );
}

export default AllStudentsSearchBar;