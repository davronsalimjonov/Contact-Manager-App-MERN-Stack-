import { discountSchema } from "@/schemas/student";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import FormSelect from "../../moleculs/Form/FormSelect";
import FormInput from "../../moleculs/Form/FormInput";
import cls from './DiscountForm.module.scss';
import Button from "../../atoms/Buttons/Button";
import { CalendarMonthIcon, ClockIcon } from "../../atoms/icons";
import FormTimeInput from "../../moleculs/Form/FormTimeInput";
import FormElementWrapper from "../../moleculs/Form/FormElementWrapper";
import DatePicker from "react-datepicker";
import { formatPrice } from "@/utils/lib";
import { cn } from '@/utils/lib';
import { useEffect } from "react";
import FormTextArea from "../../moleculs/Form/FormTextArea";

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
    classNameElement,
    defaultValues,
    onSubmit,
    btnText = ""
}) => {
    const { register, control, watch, handleSubmit, setValue, formState: { errors, isDirty, isSubmitting } } = useForm({
        mode: 'onSubmit',
        defaultValues,
        resolver: yupResolver(discountSchema)
    });

    const dateRange = watch('discountDate');
    const price = watch('price');
    const discount = watch('discount');

    useEffect(() => {
        setValue('discountPrice', formatPrice(Math.ceil(Number(watch('price').replace(/\s+/g, '')) * (100 - watch('discount')) / 100)))
    }, [price, discount])


    return (
        <>
            <form className={cn(className, cls.form)} onSubmit={handleSubmit(onSubmit)}>
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
                    preffix={"%"}
                    min={0}
                    max={100}
                    placeholder='Kiriting...'
                    register={{ ...register('discount') }}
                    error={errors?.discount?.message}
                />
                <FormInput
                    type="text"
                    className={cls.form__input}
                    label='Kurs narxi'
                    placeholder='Narxi'
                    defaultValue={formatPrice(watch('price'))}
                    register={{
                        ...register('price', {
                            onChange: e => {
                                const value = e.target.value
                                e.target.value = formatPrice(value)
                            }
                        })
                    }}
                    preffix={"so'm"}
                    error={errors?.price?.message}
                />

                <FormInput
                    name="discountPrice"
                    type="text"
                    className={cls.form__input}
                    label="Chegirmadagi kurs narxi"
                    placeholder="Narxi"
                    register={{
                        ...register('discountPrice')
                    }}
                    preffix={"so'm"}
                    error={errors?.discountPrice?.message}
                />
                <div className={cn(classNameElement, cls.form__time)}>
                    <FormElementWrapper label={"Chegirma muddati(kun)"} error={errors?.discountDate?.message}>
                        <div className={cls.form__calendar}>
                            <Controller
                                name={'discountDate'}
                                control={control}
                                render={({ field }) => (
                                    <DatePicker
                                        className={cls.form__calendar__input}
                                        {...field}
                                        selected={dateRange && dateRange[0]}
                                        onChange={(dates) => {
                                            field.onChange(dates);
                                        }}
                                        dateFormat={'dd.MM.YYYY'}
                                        startDate={dateRange && dateRange[0]}
                                        endDate={dateRange && dateRange[1]}
                                        selectsRange
                                    />)
                                } />

                            <CalendarMonthIcon />
                        </div>
                    </FormElementWrapper>

                    <FormTimeInput
                        control={control}
                        label="Time"
                        name="discountTime"
                        register={{ ...register('discountTime') }}
                        preffix={<ClockIcon />}
                        error={errors?.discountTime?.message}
                    />
                </div>
                <FormTextArea
                    className={cn(classNameElement, cls.form__input)}
                    label="Description"
                    register={{ ...register('description') }}
                    error={errors?.description?.message}
                />

                <Button type='submit'>{btnText}</Button>

            </form>
        </>

    )
}

export default DiscountForm;