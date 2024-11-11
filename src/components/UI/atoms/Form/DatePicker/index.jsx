import { forwardRef, useState } from 'react';
import ReactDatePicker from 'react-datepicker'
import { cn } from '@/utils/lib';
import { CalendarIcon } from '../../icons';
import cls from './DatePicker.module.scss';
import 'react-datepicker/dist/react-datepicker.css'

const DatePicker = forwardRef(({
    placeholder,
    className,
    onChange,
    disabled,
    readOnly,
    error,
    ...otherProps
}, ref) => {
    const [date, setDate] = useState()

    const handleChange = (date) => { 
        setDate(date)
        typeof onChange === 'function' && onChange(new Date(date).toISOString())
    }

    return (
        <ReactDatePicker 
            ref={ref}
            showIcon
            selected={date}
            wrapperClassName={cn(cls.wrapper, error && cls.error)}
            className={cn(cls.datepicker, className)}
            icon={<CalendarIcon />}
            onChange={handleChange}
            dateFormat={'dd.MM.YYYY'}
            shouldCloseOnSelect={true}
            placeholderText={placeholder}
            disabled={disabled}
            readOnly={readOnly}
            {...otherProps}
        />
    );
})

export default DatePicker;