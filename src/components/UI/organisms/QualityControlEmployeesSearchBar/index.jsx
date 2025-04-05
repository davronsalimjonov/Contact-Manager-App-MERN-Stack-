import React, { useState } from 'react'
import Select from '../../atoms/Form/Select'
import PhoneInput from '../../atoms/Form/PhoneInput'
import Input from '../../atoms/Form/Input'
import Button from '../../atoms/Buttons/Button'
import cls from './QualityControlEmployeesSearchBar.module.scss'
import { EMPLOYEE_STATUS_ENUMS } from '@/constants'
import { debounce } from '@/utils/lib'

const QualityControlEmployeesSearchBar = ({
    onChange,
    defaultValue,
    setIsOpen
}) => {
    const [filters, setFilters] = useState(defaultValue)
    const statusOptions = EMPLOYEE_STATUS_ENUMS.map((status) => ({ value: status, label: status}))

    const handleChange = (field, value) => {
        const updatedFilters = { ...filters, [field]: value };
        setFilters(updatedFilters);
        onChange(updatedFilters);
    };

  return (
    <div className={cls.bar}>
        <Select
            placeholder='Status'
            options={statusOptions}
            defaultValue={statusOptions.find(option => option.value === filters?.status)}
            onChange={option => handleChange('status', option?.value)}
            isSearchable
            isclearable
            className={cls.bar__select}
        />
        <PhoneInput
            placeholder='Telefon raqam'
            defaultValue={filters?.phone}
            className={cls.bar__input}
            onChange={debounce(value => handleChange('phone', value))}
        />
        <Input
            placeholder='Ism'
            defaultValue={filters.firstName}
            className={cls.bar__input}
            onChange={debounce(e => handleChange('firstName', e.target.value?.trim()))}
        />
        <Input
            placeholder='Familiya'
            className={cls.bar__input}
            defaultValue={filters.lastName} 
            onChange={debounce(e => handleChange('lastName', e.target.value?.trim()))}
        />
        <Button onClick={() => setIsOpen({ isOpen: true })}>Xodim Qo'shish</Button>
    </div>
  )
}

export default QualityControlEmployeesSearchBar