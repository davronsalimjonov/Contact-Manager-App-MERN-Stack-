import { discountSchema } from "@/schemas/student";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import FormSelect from "../../moleculs/Form/FormSelect";
import FormInput from "../../moleculs/Form/FormInput";
import cls from './DiscountForm.module.scss';
import Textarea from "../../atoms/Form/Textarea";
import Button from "../../atoms/Buttons/Button";
import { useState } from "react";
import { ClockIcon } from "../../atoms/icons";
import FormTimeInput from "../../moleculs/Form/FormTimeInput";
import FormDateRangePicker from "../../moleculs/Form/FormDateRangePicker";

const MONTH_OPTIONS = [
    {
        value: 1, label: "1"
    },
    {
        value: 2, label: "2"
    },
    {
        value: 3, label: "3"
    },
    {
        value: 4, label: "4"
    },
    {
        value: 5, label: "5"
    },
    {
        value: 6, label: "6"
    },
]


const DiscountForm = ({
    className,
    defaultValues,
    onSubmit,
    startDate,
    endDate,
    setStartDate,
    setEndDate,
}) => {
    const [openCalendar, setOpenCalendar] = useState(false);

    const onChange = (dates) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
    };


    const { register, control, handleSubmit, watch, setValue, formState: { errors, isDirty, isSubmitting } } = useForm({
        mode: 'onSubmit',
        defaultValues,
        resolver: yupResolver(discountSchema)
    });

    return (
        <>
            <form className={cls.form} onSubmit={handleSubmit(onSubmit)}>
                <FormSelect
                    className={cls.form__input}
                    name="month"
                    key={1}
                    isClearable={true}
                    control={control}
                    options={MONTH_OPTIONS}
                    placeholder="Tanlang"
                    label="Oylik obuna"
                    error={errors?.month?.message}
                />
                <FormInput
                    type="number"
                    className={cls.form__input}
                    label='Chegirma  miqdori'
                    placeholder='Kiriting...'
                    register={{ ...register('discount') }}
                    error={errors?.discount?.message}
                />
                <FormInput
                    type="number"
                    className={cls.form__input}
                    label='Kurs narxi'
                    placeholder='Narxi'
                    register={{ ...register('price') }}
                    error={errors?.price?.message}
                />
                <FormInput
                    name="discountPrice"
                    type="number"
                    className={cls.form__input}
                    label='Chegirmadagi kurs narxi'
                    // preffix={"so'm"}
                    // onChange={handleChange}
                    placeholder='Ismi'
                    register={{ ...register('discountPrice') }}
                    error={errors?.discountPrice?.message}
                />

                <div className={cls.form__time}>
                    <FormDateRangePicker
                        label={"Chegirma muddati(kun)"}
                        error={errors?.discountDate?.message}
                        startDate={startDate}
                        endDate={endDate}
                        control={control}
                        name={'discountDate'}
                        register={{ ...register('discountDate') }}
                        openCalendar={openCalendar}
                        setOpenCalendar={setOpenCalendar}
                        onChange={onChange}
                    />
                    <FormTimeInput
                        control={control}
                        label="Time"
                        name="discountTime"
                        register={{ ...register('discountTime') }}
                        preffix={<ClockIcon />}
                        error={errors?.discountTime?.message}
                    />
                </div>
                <Textarea
                    className={cls.form__input}
                    label="Description"
                    register={{ ...register('description') }}
                    error={errors?.description?.message}
                />

                <Button type='submit'>Qo'shish</Button>

            </form>
        </>

    )
}

export default DiscountForm;