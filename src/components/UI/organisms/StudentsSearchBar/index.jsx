import { useState } from 'react';
import { debounce } from '@/utils/lib';
import { STUDENT_STATUS_ENUMS } from '@/constants';
import Input from '../../atoms/Form/Input';
import Select from '../../atoms/Form/Select';
import PhoneInput from '../../atoms/Form/PhoneInput';
import cls from './StudentsSearchBar.module.scss';

const StudentsSearchBar = ({ onChange, defaultValue }) => {
    const [filters, setFilters] = useState(defaultValue)
    const statusOptions = STUDENT_STATUS_ENUMS.map((status) => ({ value: status, label: status }))

    const handleChange = (field, value) => {
        const updatedFilters = { ...filters, [field]: value };
        setFilters(updatedFilters);
        onChange(updatedFilters);
    };

    return (
        <div className={cls.bar}>
            <Select
                className={cls.bar__form__select}
                placeholder='Status user'
                options={statusOptions}
                defaultValue={statusOptions.find(option => option.value === filters?.status)}
                onChange={option => handleChange('status', option?.value)}
                isclearable
            />
            <Input 
                placeholder='Ism'
                className={cls.bar__form__input}
                defaultValue={filters?.firstName}
                onChange={debounce(e => handleChange('firstName', e.target.value?.trim()))}
            />
            <Input 
                placeholder='Familiya'
                className={cls.bar__form__input}
                defaultValue={filters?.lastName}
                onChange={debounce(e => handleChange('lastName', e.target.value?.trim()))}
            />
            <PhoneInput 
                className={cls.bar__form__input}
                placeholder='Telefon raqam' 
                defaultValue={filters?.phone}
                onChange={debounce(value => handleChange('phone', value))}
            />
        </div>
    );
}

export default StudentsSearchBar;