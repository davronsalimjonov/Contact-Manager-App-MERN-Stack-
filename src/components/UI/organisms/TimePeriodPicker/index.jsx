import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { endOfISOWeek, startOfISOWeek } from 'date-fns';
import { cn } from '@/utils/lib';
import useClickOutside from '@/hooks/useClickOutside';
import Button from '../../atoms/Buttons/Button';
import { LeftArrowIcon } from '../../atoms/icons';
import DatePicker from '../../atoms/Form/DatePicker';
import cls from './TimePeriodPicker.module.scss';

let defaultDate = dayjs().startOf('month').format('YYYY-MM-DD')
let defaultEndDate = dayjs().endOf('month').format('YYYY-MM-DD')

const TimePeriodPicker = ({ onChange }) => {
    const [timePeriod, setTimePeriod] = useState('month')
    const [isOpenPopover, setIsOpenPopover] = useState(false)
    const ref = useClickOutside({ onClickOutside: () => setIsOpenPopover(false) })
    const [date, setDate] = useState({ startDate: defaultDate, endDate: defaultEndDate, date: defaultDate, type: timePeriod })

    const handleChangeDatepicker = (date) => {
        date = new Date(date)
        date.setHours(0, 0, 0, 0)
        date = new Date(date.getTime() + 5 * 60 * 60000).toISOString()

        let startDate;
        let endDate;

        if (timePeriod === 'day') {
            let lastHours = new Date(date)
            lastHours.setHours(23, 59, 59, 0)

            startDate = date
            endDate = new Date(lastHours.getTime() + 5 * 60 * 60000).toISOString()
        } else if (timePeriod === 'week') {
            startDate = new Date(startOfISOWeek(date) - (new Date(date).getTimezoneOffset() * 60000)).toISOString()
            endDate = new Date(endOfISOWeek(date) - (new Date(date).getTimezoneOffset() * 60000)).toISOString()
        } else if (timePeriod === 'month') {
            startDate = dayjs(date).startOf('month').format('YYYY-MM-DD')
            endDate = dayjs(date).endOf('month').format('YYYY-MM-DD')
        } else {
            startDate = date
            endDate = date
        }

        setDate({ startDate, endDate, date, type: timePeriod })
        typeof onChange === 'function' && onChange({ startDate, endDate, date, type: timePeriod })
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
                        selected={date?.date}
                        maxDate={new Date(Date.now())}
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