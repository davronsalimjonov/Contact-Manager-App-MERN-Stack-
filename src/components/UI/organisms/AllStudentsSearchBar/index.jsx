import { useState } from 'react';
import { useGetCourses } from '@/hooks/useUserCourse';
import { debounce, getUserFullName } from '@/utils/lib';
import { useGetGroupsForOptions } from '@/hooks/useGroups';
import { useGetMentorsForOptions } from '@/hooks/useMentor';
import { DEGREEOPTIONS, STUDENTS_STATUS_OPTIONS } from '@/constants';
import Input from '../../atoms/Form/Input';
import Select from '../../atoms/Form/Select';
import PhoneInput from '../../atoms/Form/PhoneInput';
import cls from './AllStudentsSearchBar.module.scss';

const AllStudentsSearchBar = ({ onChange, defaultValue = {} }) => {
    const { data: courses } = useGetCourses();
    const { data: groups } = useGetGroupsForOptions();
    const [filters, setFilters] = useState(defaultValue);
    const { mainMentors: { data: mainMentors } } = useGetMentorsForOptions();

    const groupsOptions = groups?.map(group => ({ value: group?.id, label: group?.title })) || [];
    const coursesOptions = courses?.map(course => ({ value: course.id, label: course.title })) || [];
    const mainMentorOptions = mainMentors?.map(mentor => ({ value: mentor.id, label: getUserFullName(mentor) })) || [];

    const handleChange = (field, value) => {
        const updatedFilters = { ...filters, [field]: value };
        setFilters(updatedFilters);
        onChange(updatedFilters);
    };

    return (
        <div className={cls.bar}>
            <Input
                placeholder="Ism"
                className={cls.bar__form__input}
                defaultValue={filters.firstName}
                onChange={debounce(e => handleChange("firstName", e.target.value), 200)}
            />
            <Input
                placeholder="Familiya"
                className={cls.bar__form__input}
                defaultValue={filters.lastName}
                onChange={debounce(e => handleChange("lastName", e.target.value), 200)}
            />
            <PhoneInput
                placeholder="Telefon raqam"
                className={cls.bar__form__input}
                defaultValue={filters.phone}
                onChange={debounce(value => handleChange("phone", value), 200)}
            />
            <Select
                placeholder="Mentor"
                className={cls.bar__form__select}
                options={mainMentorOptions}
                value={mainMentorOptions.find(option => option.value === filters.teacher) || null}
                onChange={option => handleChange("teacher", option?.value)}
                isClearable
            />
            <Select
                placeholder="Status user"
                className={cls.bar__form__select}
                options={STUDENTS_STATUS_OPTIONS}
                value={STUDENTS_STATUS_OPTIONS.find(option => option.value === filters.status) || null}
                onChange={option => handleChange("status", option?.value)}
                isClearable
            />
            <Select
                placeholder="Darajasi"
                className={cls.bar__form__select}
                options={DEGREEOPTIONS}
                value={DEGREEOPTIONS.find(option => option.value === filters.level) || null}
                onChange={option => handleChange("level", option?.value)}
                isClearable
            />
            <Select
                placeholder="Kurs"
                className={cls.bar__form__select}
                options={coursesOptions}
                value={coursesOptions.find(option => option.value === filters.course) || null}
                onChange={option => handleChange("course", option?.value)}
                isClearable
            />
            <Select
                placeholder="Guruh"
                className={cls.bar__form__select}
                options={groupsOptions}
                value={groupsOptions.find(option => option.value === filters.group) || null}
                onChange={option => handleChange("group", option?.value)}
                isClearable
            />
        </div>
    );
};

export default AllStudentsSearchBar;