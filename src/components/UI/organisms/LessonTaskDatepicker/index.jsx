import { useState } from 'react';
import Button from '../../atoms/Buttons/Button';
import DatePicker from '../../atoms/Form/DatePicker';
import cls from './LessonTaskDatepicker.module.scss';

const LessonTaskDatepicker = ({
    onSave
}) => {
    const [date, setDate] = useState()

    return (
        <div className={cls.picker}>
            <DatePicker
                inline
                showTimeInput
                minDate={new Date(Date.now())}
                onChange={setDate}
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