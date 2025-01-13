import { debounce } from '@/utils/lib';
import { GROUPS, MENTORS_STATUS_ENUMS } from '@/constants';
import Input from '../../atoms/Form/Input';
import Select from '../../atoms/Form/Select';
import PhoneInput from '../../atoms/Form/PhoneInput';
import cls from './MentorsSearchBar.module.scss';
import Button from '../../atoms/Buttons/Button';
import { Arrow } from '../../atoms/icons';

const MentorsSearchBar = ({
    onChangeStatus,
    onChangeFirstName,
    onChangeLastName,
    onChangePhone,
    onChangeDegree
}) => {
    const languageLevelOptions = GROUPS.map((status) => ({ value: status, label: status }))
    const mentorStatusOptions = MENTORS_STATUS_ENUMS.map((status) => ({ value: status, label: status}))

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
                placeholder='Til Bilish Darajasi'
                options={languageLevelOptions}
                onChange={onChangeDegree}
                isClearable
            />
            <Select
                className={cls.bar__form__select}
                placeholder='Statusi'
                options={mentorStatusOptions}
                onChange={onChangeStatus}
                isClearable
            />
            <Button
                isSpaced={true}
            >
                Mentor Qo'shish
                <span className='arrowIconClr'>
                    <Arrow />
                </span>
            </Button>
        </div>
    );
}

export default MentorsSearchBar;