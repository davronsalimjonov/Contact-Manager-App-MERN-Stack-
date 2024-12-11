import { useState } from 'react';
import Button from '../../atoms/Buttons/Button';
import DatePicker from '../../atoms/Form/DatePicker';
import cls from './LessonTaskDatepicker.module.scss';

const LessonTaskDatepicker = ({
    defaultValue,
    onSave
}) => {
    const [date, setDate] = useState(defaultValue)

    return (
        <div className={cls.picker}>
            <DatePicker
                inline
                showTimeInput
                onChange={setDate}
                defaultValue={date}
                minDate={new Date(Date.now())}
            />
            <div>
                <Button 
                    onClick={() => onSave?.(date)}
                    disabled={!date}
                >
                    Saqlash
                </Button>
            </div>
        </div>
    );
}

export default LessonTaskDatepicker;