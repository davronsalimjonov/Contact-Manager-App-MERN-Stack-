import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { debounce } from '@/utils/lib';
import { ENGLISH_LEVEL_OPTIONS, MENTOR_STATUS_OPTIONS } from '@/constants/form';
import Input from '../../atoms/Form/Input';
import Select from '../../atoms/Form/Select';
import { PlusIcon } from '../../atoms/icons';
import Button from '../../atoms/Buttons/Button';
import PhoneInput from '../../atoms/Form/PhoneInput';
import cls from './MentorsSearchbar.module.scss';

const MentorsSearchBar = ({ onChange, defaultValue }) => {
    const navigate = useNavigate()
    const [filters, setFilters] = useState(defaultValue)

    const handleChange = (field, value) => {
        const updatedFilters = { ...filters, [field]: value };
        setFilters(updatedFilters);
        onChange(updatedFilters);
    };

    return (
        <div className={cls.bar}>
            <Input 
                placeholder='Ism'
                className={cls.bar__form__input}
                defaultValue={filters.firstName}
                onChange={debounce(e => handleChange("firstName", e.target.value), 200)}
            />
            <Input 
                placeholder='Familiya'
                className={cls.bar__form__input}
                defaultValue={filters.lastName}
                onChange={debounce(e => handleChange("lastName", e.target.value), 200)}
            />
            <PhoneInput 
                className={cls.bar__form__input}
                placeholder='Telefon raqam' 
                defaultValue={filters.phone}
                onChange={debounce(value => handleChange("phone", value), 200)}
            />
            <Select
                className={cls.bar__form__select}
                placeholder='Statusi'
                options={MENTOR_STATUS_OPTIONS}
                defaultValue={MENTOR_STATUS_OPTIONS.find(option => option.value === filters.status) || null}
                onChange={option => handleChange("status", option?.value)}
                isclearable
            />
            <Select
                placeholder='Darajasi'
                className={cls.bar__form__select}
                options={ENGLISH_LEVEL_OPTIONS}
                defaultValue={ENGLISH_LEVEL_OPTIONS.find(option => option.value === filters.degree) || null}
                onChange={option => handleChange("degree", option?.value)}
                isclearable
            />
            <Button onClick={() => navigate(`/mentors/create-mentor`)}>
                Mentor Qo'shish <PlusIcon />
            </Button>
        </div>
    );
}

export default MentorsSearchBar;