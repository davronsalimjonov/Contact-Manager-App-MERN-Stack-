import { useState } from 'react';
import Button from '../../atoms/Buttons/Button';
import DatePicker from '../../atoms/Form/DatePicker';
import cls from './LessonTaskDatepicker.module.scss';

const times = [
    { label: '10 minut', value: 10 },
    { label: '30 minut', value: 30 },
    { label: '1 soat', value: 60 },
    { label: '2 soat', value: 60 * 2 },
    { label: '4 soat', value: 60 * 4 },
    { label: '1 kun', value: 60 * 24 },
    { label: '1 hafta', value: 60 * 24 * 7 },
    { label: '1 oy', value: 60 * 24 * 30 },
]

const LessonTaskDatepicker = ({
    onSave,
    defaultValue,
}) => {
    const [date, setDate] = useState(defaultValue)

    const handleSetTime = (minutesToAdd) => {
        const currentTime = new Date();
        currentTime.setMinutes(currentTime.getMinutes() + minutesToAdd);
        setDate(currentTime.toISOString());
    }

    return (
        <div className={cls.picker}>
            <DatePicker
                inline
                showTimeInput
                selected={date}
                onChange={setDate}
                minDate={new Date(Date.now())}
            />
            <div>
                <div className={cls.picker__times}>
                    <span>Eslating</span>
                    {times?.length > 0 && times.map(time => (
                        <button key={time.value} onClick={() => handleSetTime(time.value)}>{time.label}</button>
                    ))}
                </div>
                <Button onClick={() => onSave?.(date)} disabled={!date}>Saqlash</Button>
            </div>

        </div>
    );
}

export default LessonTaskDatepicker;