import { useState } from 'react';
import ReactDatePicker from 'react-datepicker'
import { CalendarIcon } from '../../icons';
import cls from './DatePicker.module.scss';
import 'react-datepicker/dist/react-datepicker.css'

const DatePicker = () => {
    const [date, setDate] = useState()

    return (
        <ReactDatePicker 
            showIcon
            selected={date}
            wrapperClassName={cls.wrapper}
            className={cls.datepicker}
            icon={<CalendarIcon />}
            onChange={setDate}
            locale={'ru'}
            dateFormat={'dd.MM.YYYY'}
            shouldCloseOnSelect={true}
        />
    );
}

export default DatePicker;