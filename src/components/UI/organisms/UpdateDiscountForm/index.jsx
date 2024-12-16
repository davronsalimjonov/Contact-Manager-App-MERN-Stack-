import { MONTH_OPTIONS } from '@/constants/form';
import Textarea from '../../atoms/Form/Textarea';
import FormDateRangePicker from '../../moleculs/Form/FormDateRangePicker';
import FormInput from '../../moleculs/Form/FormInput';
import FormSelect from '../../moleculs/Form/FormSelect';
import FormTimeInput from '../../moleculs/Form/FormTimeInput';
import cls from './UpdateDiscountForm.module.scss';
import { useState } from 'react';
import { ClockIcon } from '../../atoms/icons';

const UpdateDiscountForm = ({
    control,
    defaultValues,
    startDate,
    endDate,
    register,
    errors,
}) => {
    const [openCalendar, setOpenCalendar] = useState(false);

    const onChange = (dates) => {
        const [start, end] = dates;
        // setStartDate(start);
        // setEndDate(end);
    };

    return (
        <div className={cls.form}>
            <FormSelect
                className={cls.form__input}
                defaultValue={defaultValues?.month?.value}
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
                defaultValue={defaultValues?.discount}
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

        </div>
    )
}


export default UpdateDiscountForm;