import Button from '../../atoms/Buttons/Button';
import Input from '../../atoms/Form/Input';
import Select from '../../atoms/Form/Select';
import { PlusIcon, SearchIcon } from '../../atoms/icons';
import cls from './StudentsSearchBar.module.scss';

const StudentsSearchBar = () => {
    return (
        <div className={cls.bar}>
            <Select
                placeholder='Status user'
            />
            <Select
                placeholder='User turi'
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