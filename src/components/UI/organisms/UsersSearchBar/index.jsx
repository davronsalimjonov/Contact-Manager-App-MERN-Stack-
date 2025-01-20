import { debounce } from '@/utils/lib';
import { USER_STATUS_ENUMS } from '@/constants';
import Input from '../../atoms/Form/Input';
import Select from '../../atoms/Form/Select';
import PhoneInput from '../../atoms/Form/PhoneInput';
import cls from './UsersSearchBar.module.scss';
import Button from '../../atoms/Buttons/Button';
import { Arrow } from '../../atoms/icons';
import FormDatepicker from '../../moleculs/Form/FormDatepicker';
import { useState } from 'react';

const UsersSearchBar = ({
    onChangeStatus,
    onChangeFirstName,
    onChangeLastName,
    onChangePhone,
    onChangeUniqueId,
    onChangeDate
}) => {
    const statusOptions = USER_STATUS_ENUMS.map((status) => ({ value: status, label: status }))
    const [_, setDate] = useState()

    const handleDateChange = (newDate) => {
        setDate(newDate);
        if (newDate) {
            const formattedDate = newDate.toISOString();
            onChangeDate(formattedDate);
        }
    }

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
                className={cls.bar__form__input}
                placeholder='Telefon raqam' 
                onChange={debounce(onChangePhone, 200)}
            />
            <Select
                className={cls.bar__form__select}
                placeholder='Status user'
                options={statusOptions}
                onChange={onChangeStatus}
                isClearable
            />
            <Input 
                placeholder='Unique ID'
                className={cls.bar__form__input}
                onChange={debounce(onChangeUniqueId, 200)}
            />
            <div className={cls.bar__form__datePicker}>
                <FormDatepicker
                    placeholder='Ro’yxatdan O’tgan Sanasi'
                    name="birthday"
                    onChange={handleDateChange}
                />
            </div>
            <Button
                isSpaced={true}
            >
                Foydalanuvchi Qo'shish
                <span className='arrowIconClr'>
                    <Arrow />
                </span>
            </Button>
        </div>
    );
}

export default UsersSearchBar;