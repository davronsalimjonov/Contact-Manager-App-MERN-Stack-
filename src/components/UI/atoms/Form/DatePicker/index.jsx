import { useState } from 'react';
import ReactDatePicker from 'react-datepicker'
import { CalendarIcon } from '../../icons';
import cls from './DatePicker.module.scss';
import 'react-datepicker/dist/react-datepicker.css'
import { cn } from '@/utils/lib';

const DatePicker = ({
    placeholder,
    className,
    onChange,
    disabled,
    readOnly,
    error,
    ...otherProps
}) => {
    const [date, setDate] = useState()

    const handleChange = (date) => { 
        setDate(date)
        typeof onChange === 'function' && onChange(date)
    }

    return (
        <ReactDatePicker 
            showIcon
            selected={date}
            wrapperClassName={cls.wrapper}
            className={cn(cls.datepicker, error && cls.error, className)}
            icon={<CalendarIcon />}
            onChange={handleChange}
            dateFormat={'dd.MM.YYYY'}
            shouldCloseOnSelect={true}
            placeholder={placeholder}
            disabled={disabled}
            readOnly={readOnly}
            {...otherProps}
        />
    );
}

export default DatePicker;