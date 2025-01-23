import { forwardRef, useEffect, useState } from 'react';
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
    defaultValue,
    selectsRange,
    selectedEndDate,
    selectedStartDate,
    ...otherProps
}, ref) => {
    const [date, setDate] = useState(defaultValue)

    const handleChange = (date) => {
        setDate(date)
        typeof onChange === 'function' && onChange(date)
    }


    useEffect(() => {
        if(selectsRange){
            console.log(selectedEndDate);
            
            setDate([new Date(selectedStartDate), new Date(selectedEndDate)])
        }
    }, [selectsRange])

    return (
        <ReactDatePicker 
            ref={ref}
            showIcon
            selected={date}
            startDate={selectsRange ? date?.[0] : undefined}
            endDate={selectsRange ? date?.[1] : undefined}
            wrapperClassName={cn(cls.wrapper, error && cls.error,)}
            className={cn(cls.datepicker, className)}
            icon={<CalendarIcon />}
            onChange={handleChange}
            dateFormat={'dd.MM.yyyy'}
            shouldCloseOnSelect={true}
            placeholderText={placeholder}
            disabled={disabled}
            readOnly={readOnly}
            calendarStartDay={1}
            disabledKeyboardNavigation
            selectsRange={selectsRange}
            {...otherProps}
        />
    );
})

export default DatePicker;