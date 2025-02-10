import { debounce } from '@/utils/lib';
import { DEGREEOPTIONS, STUDENTS_STATUS_OPTIONS } from '@/constants';
import Input from '../../atoms/Form/Input';
import Select from '../../atoms/Form/Select';
import cls from './AllStudentsSearchBar.module.scss';
import Button from '../../atoms/Buttons/Button';
import { PlusIcon } from '../../atoms/icons';
import PhoneInput from '../../atoms/Form/PhoneInput';
import { useNavigate } from 'react-router-dom';
import { useGetCourses } from '@/hooks/useUserCourse';

const AllStudentsSearchBar = ({
    onChangeStatus,
    onChangeName,
    onChangeDegree,
    onChangeCourse,
    onChangePhone
}) => {
    const { data: courses } = useGetCourses();
const navigate = useNavigate();

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
                options={STUDENTS_STATUS_OPTIONS}
                onChange={onChangeStatus}
                isclearable
            />

            <PhoneInput
                className={cls.bar__form__input}
                placeholder='Telefon raqam'
                onChange={debounce(onChangePhone, 200)}
            />


            <Select
                className={cls.bar__form__select}
                placeholder='Darajasi'
                options={DEGREEOPTIONS}
                onChange={onChangeDegree}
                isclearable
            />
            <Select
                className={cls.bar__form__select}
                placeholder='Kurslar bo’yicha'
                options={courses?.map(course => ({ value: course.id, label: course.title }))}
                onChange={onChangeCourse}
                isclearable
            />

            <Button type='button' onClick={()=>navigate('/add-student')}>O'quvchi qo'shish <PlusIcon /></Button>
        </div>
    );
}

export default AllStudentsSearchBar;