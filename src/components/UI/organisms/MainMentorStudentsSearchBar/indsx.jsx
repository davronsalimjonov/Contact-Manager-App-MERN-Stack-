import { debounce } from '@/utils/lib';
import Input from '../../atoms/Form/Input';
import Select from '../../atoms/Form/Select';
import PhoneInput from '../../atoms/Form/PhoneInput';
import cls from './MainMentorStudentsSearchBar.module.scss';
import Button from '../../atoms/Buttons/Button';
import useGetGroups from '@/hooks/useGetGroups';
import { STUDENT_STATUS_ENUMS } from '@/constants';

const MainMentorStudentsSearchBar = ({
    onChangeStatus,
    onChangeFirstName,
    onChangeLastName,
    onChangePhone,
    onChangeGroup,
    groupId='',
    setIsOpen
}) => {

    const groupFilters = []
    const {
        groups: { data: groups }
    } = useGetGroups()

    {groups?.map((group) => 
        groupFilters.push({ label: group?.title, value: group?.id })  
    )}

    const statusOptions = STUDENT_STATUS_ENUMS.map((status) => ({ value: status, label: status }))

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
                options={groupFilters}
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
            {groupId === '' ? <></> : <Button 
                    className={cls.bar__form__button}
                    onClick={() => {
                        setIsOpen(true)
                    }}
                >
                    O'quvchi Qo'shish
                    <span>+</span>
                </Button>
            }
        </div>
    );
}

export default MainMentorStudentsSearchBar;