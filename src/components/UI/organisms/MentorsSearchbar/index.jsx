import { useNavigate } from 'react-router-dom';
import { debounce } from '@/utils/lib';
import { ENGLISH_LEVEL_OPTIONS, MENTOR_STATUS_OPTIONS } from '@/constants/form';
import Input from '../../atoms/Form/Input';
import Select from '../../atoms/Form/Select';
import { PlusIcon } from '../../atoms/icons';
import Button from '../../atoms/Buttons/Button';
import PhoneInput from '../../atoms/Form/PhoneInput';
import cls from './MentorsSearchbar.module.scss';

const MentorsSearchBar = ({
    onChangeStatus,
    onChangeFirstName,
    onChangeLastName,
    onChangePhone,
    onChangeDegree
}) => {
    const navigate = useNavigate()

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
                placeholder='Statusi'
                options={MENTOR_STATUS_OPTIONS}
                onChange={onChangeStatus}
                isclearable
            />
            <Select
                placeholder='Darajasi'
                className={cls.bar__form__select}
                options={ENGLISH_LEVEL_OPTIONS}
                onChange={onChangeDegree}
                isclearable
            />
            <Button onClick={() => navigate(`/mentors/create-mentor`)}>
                Mentor Qo'shish <PlusIcon />
            </Button>
        </div>
    );
}

export default MentorsSearchBar;