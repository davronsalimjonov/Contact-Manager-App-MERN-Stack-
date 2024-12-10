import { CalendarMonthIcon } from "@/components/UI/atoms/icons";
import FormElementWrapper from "../FormElementWrapper";
import cls from './FormatDateRangePicker.module.scss';
import Button from "@/components/UI/atoms/Buttons/Button";
import DatePicker from "react-datepicker";
import { formatDate } from "@/utils/formatDate";
import Input from "@/components/UI/atoms/Form/Input";

const FormDateRangePicker = ({
    label,
    startDate,
    endDate,
    openCalendar,
    error,
    register,
    setOpenCalendar,
    onChange
}) => {
    return (
        <FormElementWrapper className={cls.form} label={label} error={error}>
            <Input
                preffix={<CalendarMonthIcon />}
                className={cls.form__field}
                register={register}
                onClick={() => setOpenCalendar(prev => !prev)}
                value={
                    startDate && endDate && (`${formatDate(startDate)} - ${formatDate(endDate)}`)
                }
            />
            {
                openCalendar && <div className={cls.form__date__picker}>
                    <DatePicker
                        selected={startDate}
                        onChange={onChange}
                        startDate={startDate}
                        endDate={endDate}
                        selectsRange
                        inline
                    />
                </div>
            }


        </FormElementWrapper>)
}

export default FormDateRangePicker;