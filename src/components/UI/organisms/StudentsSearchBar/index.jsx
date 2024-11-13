import { debounce } from '@/utils/lib';
import { STUDENT_STATUS_ENUMS } from '@/constants';
import Button from '../../atoms/Buttons/Button';
import Input from '../../atoms/Form/Input';
import Select from '../../atoms/Form/Select';
import { PlusIcon, SearchIcon } from '../../atoms/icons';
import cls from './StudentsSearchBar.module.scss';

const StudentsSearchBar = ({
    onChangeStatus,
    onChangeInput
}) => {
    const statusOptions = STUDENT_STATUS_ENUMS.map((status) => ({ value: status, label: status }))

    return (
        <div className={cls.bar}>
            <Select
                placeholder='Status user'
                options={statusOptions}
                onChange={onChangeStatus}
                isClearable
            />
            <Input 
                placeholder='Ism Familiya'
                className={cls.bar__form__input}
                onChange={debounce(onChangeInput)}
            />
            <form className={cls.bar__form}>
                <Input
                    className={cls.bar__form__input}
                    placeholder='Status ID'
                />
                <Button className={cls.bar__form__btn}>Qidirish <SearchIcon /></Button>
            </form>
            <Button>Guruh qo’shish <PlusIcon /></Button>
        </div>
    );
}

export default StudentsSearchBar;