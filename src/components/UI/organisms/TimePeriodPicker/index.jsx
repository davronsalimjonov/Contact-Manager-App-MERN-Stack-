import { useEffect, useState } from 'react';
import { cn } from '@/utils/lib';
import useClickOutside from '@/hooks/useClickOutside';
import { endOfISOWeek, lastDayOfMonth, startOfISOWeek, startOfMonth } from 'date-fns';
import Button from '../../atoms/Buttons/Button';
import { LeftArrowIcon } from '../../atoms/icons';
import DatePicker from '../../atoms/Form/DatePicker';
import cls from './TimePeriodPicker.module.scss';

const defaultDate = new Date(Date.now()).toISOString()

const TimePeriodPicker = ({ onChange }) => {
    const [timePeriod, setTimePeriod] = useState('day')
    const [isOpenPopover, setIsOpenPopover] = useState(false)
    const ref = useClickOutside({ onClickOutside: () => setIsOpenPopover(false) })
    const [date, setDate] = useState({ startDate: defaultDate, endDate: defaultDate, date: defaultDate })

    const handleChangeDatepicker = (date) => {
        let startDate;
        let endDate;

        if (timePeriod === 'day') {
            startDate = date
            endDate = date
        } else if (timePeriod === 'week') {
            startDate = new Date(startOfISOWeek(date) - (new Date(date).getTimezoneOffset() * 60000)).toISOString()
            endDate = new Date(endOfISOWeek(date) - (new Date(date).getTimezoneOffset() * 60000)).toISOString()
        } else if (timePeriod === 'month') {
            startDate = new Date(startOfMonth(date) - (new Date(date).getTimezoneOffset() * 60000)).toISOString()
            endDate = new Date(lastDayOfMonth(date) - (new Date(date).getTimezoneOffset() * 60000)).toISOString()
        } else {
            startDate = date
            endDate = date
        }

        setDate({ startDate, endDate, date })
        typeof onChange === 'function' && onChange({ startDate, endDate, date })
    }

    useEffect(() => {
        handleChangeDatepicker(date?.date || new Date(Date.now()).toISOString())
    }, [timePeriod])

    return (
        <div style={{ position: 'relative' }} ref={ref}>
            <button className={cls.btn} onClick={() => setIsOpenPopover(state => !state)}>
                Kalendar
                <LeftArrowIcon style={{ transform: 'rotate(-90deg)' }} />
            </button>
            {isOpenPopover && (
                <div className={cls.popover}>
                    <div className={cls.popover__btns}>
                        <Button onClick={() => setTimePeriod('day')} className={cn(timePeriod === 'day' && cls.active)}>1 kun</Button>
                        <Button onClick={() => setTimePeriod('week')} className={cn(timePeriod === 'week' && cls.active)}>1 hafta</Button>
                        <Button onClick={() => setTimePeriod('month')} className={cn(timePeriod === 'month' && cls.active)}>1 oy</Button>
                    </div>
                    <DatePicker
                        inline
                        className={cls.popover__datepicker}
                        showWeekPicker={timePeriod === 'week'}
                        showMonthYearPicker={timePeriod === 'month'}
                        onChange={handleChangeDatepicker}
                    />
                </div>
            )}
        </div>
    );
}

export default TimePeriodPicker;