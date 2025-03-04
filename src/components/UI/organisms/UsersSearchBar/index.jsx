import { debounce } from '@/utils/lib';
import { USER_TYPE_OPTIONS } from '@/constants/form';
import Input from '../../atoms/Form/Input';
import Select from '../../atoms/Form/Select';
import { ArrowDown } from '../../atoms/icons';
import Button from '../../atoms/Buttons/Button';
import PhoneInput from '../../atoms/Form/PhoneInput';
import cls from './UsersSearchBar.module.scss';

const UsersSearchBar = ({
    onChangeStatus,
    onChangeFirstName,
    onChangeLastName,
    onChangePhone,
}) => {    
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
                options={USER_TYPE_OPTIONS}
                onChange={onChangeStatus}
                isclearable
            />
            {/* <Button>
                Foydalanuvchi Qo'shish <ArrowDown fill="#fff" />
            </Button> */}
        </div>
    );
}

export default UsersSearchBar;