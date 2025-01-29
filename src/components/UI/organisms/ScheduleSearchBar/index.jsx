import { DEGREEOPTIONS, STUDENT_STATUS_ENUMS, WEEKDAYOPTIONS } from '@/constants';
import Select from '../../atoms/Form/Select';
import cls from './ScheduleSearchBar.module.scss';
import { PlusIcon} from '../../atoms/icons';
import Button from '../../atoms/Buttons/Button';

const ScheduleSearchBar = ({
    onChangeDegree,
    onChangeWeekday,
    onAddLesson,
}) => {

    return (
        <div className={cls.search}>
            <div className={cls.bar}>
                
                {/* <Select
                    className={cls.bar__form__select}
                    placeholder='Hafta kuni'
                    options={WEEKDAYOPTIONS}
                    onChange={onChangeWeekday}
                    isClearable
                />
                <Select
                    className={cls.bar__form__select}
                    placeholder='Darajasi'
                    options={DEGREEOPTIONS}
                    onChange={onChangeDegree}
                    isClearable
                /> */}

            </div>
            <Button title="Qo'shish" className={cls.bar__form__btn} onClick={onAddLesson} type='button'><PlusIcon />Qo'shish</Button>
        </div>
    );
}

export default ScheduleSearchBar;
