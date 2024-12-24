import { debounce } from '@/utils/lib';
import { GROUPS } from '@/constants';
import Input from '../../atoms/Form/Input';
import Select from '../../atoms/Form/Select';
import PhoneInput from '../../atoms/Form/PhoneInput';
import cls from './MainMentorStudentsSearchBar.module.scss';
import Button from '../../atoms/Buttons/Button';

const MainMentorStudentsSearchBar = ({
    onChangeStatus,
    onChangeFirstName,
    onChangeLastName,
    onChangePhone,
    onChangeGroup,
    statusOptions=[]
}) => {
    
    const studentGroups = GROUPS.map((status) => ({ value: status, label: status }))

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
                placeholder='Group user'
                options={studentGroups}
                onChange={onChangeGroup}
                isClearable
            />
            <Select
                className={cls.bar__form__select}
                placeholder='Status user'
                options={statusOptions}
                onChange={onChangeStatus}
                isClearable
            />
            <Button>
                Guruh Qo'shish
                <span>+</span>
            </Button>
            <Button className={cls.bar__form__button}>
                O'quvchi Qo'shish
                <span>+</span>
            </Button>
        </div>
    );
}

export default MainMentorStudentsSearchBar;