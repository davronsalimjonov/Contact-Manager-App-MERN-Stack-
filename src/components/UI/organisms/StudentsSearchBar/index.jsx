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
                isClearable
            />
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
            {/* <form className={cls.bar__form}>
                <Input
                    className={cls.bar__form__input}
                    placeholder='Status ID'
                />
                <Button className={cls.bar__form__btn}>Qidirish <SearchIcon /></Button>
            </form>
            <Button>Guruh qo’shish <PlusIcon /></Button> */}
        </div>
    );
}

export default StudentsSearchBar;