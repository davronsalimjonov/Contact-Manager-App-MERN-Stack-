import { debounce } from '@/utils/lib';
import { STUDENT_STATUS_ENUMS } from '@/constants';
import Input from '../../atoms/Form/Input';
import Select from '../../atoms/Form/Select';
import PhoneInput from '../../atoms/Form/PhoneInput';
import cls from './StudentsSearchBar.module.scss';

const StudentsSearchBar = ({
    onChangeStatus,
    onChangeFirstName,
    onChangeLastName,
    onChangePhone,
}) => {
    const statusOptions = STUDENT_STATUS_ENUMS.map((status) => ({ value: status, label: status }))

    return (
        <div className={cls.bar}>
            <Select
                className={cls.bar__form__select}
                placeholder='Status user'
                options={statusOptions}
                onChange={onChangeStatus}
                isclearable
            />
            <Input 
                placeholder='Ism'
                className={cls.bar__form__input}
                onChange={debounce(onChangeFirstName)}
            />
            <Input 
                placeholder='Familiya'
                className={cls.bar__form__input}
                onChange={debounce(onChangeLastName)}
            />
            <PhoneInput 
                className={cls.bar__form__input}
                placeholder='Telefon raqam' 
                onChange={debounce(onChangePhone)}
            />
        </div>
    );
}

export default StudentsSearchBar;