import { useState } from 'react';
import { debounce } from '@/utils/lib';
import Input from '../../atoms/Form/Input';
import Select from '../../atoms/Form/Select';
import PhoneInput from '../../atoms/Form/PhoneInput';
import cls from './UsersSearchBar.module.scss';

const UsersSearchBar = ({ onChange, defaultValue }) => {
    const [filters, setFilters] = useState({ ...defaultValue });

    const handleChange = (field, value) => {
        const updatedFilters = { ...filters, [field]: value };
        setFilters(updatedFilters);
        onChange(updatedFilters);
    };

    const statusOptions = [
        { label: 'O\'quvchi', value: true },
        { label: 'Free', value: false },
    ];

    return (
        <div className={cls.bar}>
            <Input
                placeholder="Ism"
                defaultValue={filters.firstName}
                className={cls.bar__form__input}
                onChange={debounce((e) => handleChange("firstName", e.target.value), 200)}
            />
            <Input
                placeholder="Familiya"
                defaultValue={filters.lastName}
                className={cls.bar__form__input}
                onChange={debounce((e) => handleChange("lastName", e.target.value), 200)}
            />
            <PhoneInput
                className={cls.bar__form__input}
                placeholder="Telefon raqam"
                defaultValue={filters.phone}
                onChange={debounce((value) => handleChange("phone", value), 200)}
            />
            <Select
                className={cls.bar__form__select}
                placeholder="Status user"
                defaultValue={statusOptions.find(option => option.value === filters.isPro)}
                options={statusOptions}
                onChange={(option) => handleChange("isPro", option?.value)}
                isClearable
            />
        </div>
    );
};

export default UsersSearchBar;