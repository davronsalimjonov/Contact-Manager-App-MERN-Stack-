import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { GENDER_OPTIONS } from '@/constants/form';
import { saleFormSchema } from '@/schemas/seller';
import { useGetCourse } from '@/hooks/useGetCourse';
import { yupResolver } from '@hookform/resolvers/yup';
import Button from '../../atoms/Buttons/Button';
import FormInput from '../../moleculs/Form/FormInput';
import FormSelect from '../../moleculs/Form/FormSelect';
import FormPhoneInput from '../../moleculs/Form/FormPhoneInput';
import FormRadioGroup from '../../moleculs/Form/FormRadioGroup';
import cls from './SaleForm.module.scss';

const SaleForm = ({ onSubmit }) => {
    const { courseForSelect: { data: courseForSelect } } = useGetCourse()
    const { register, formState: { errors, isSubmitting, isSubmitSuccessful }, control, handleSubmit, watch, setError, clearErrors, reset } = useForm({ mode: 'onSubmit', resolver: yupResolver(saleFormSchema) })

    const phone = watch('phone');
    const secondPhone = watch('secondPhone');
    const thirdPhone = watch('thirdPhone');

    const courseOptions = courseForSelect?.map(({ title, id }) => ({ label: title, value: id }))
    const coursePeriod = Array(6).fill(null).map((_, index) => ({ label: `${index + 1} oy`, value: index + 1 }))

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset();
        }
    }, [isSubmitSuccessful])

    useEffect(() => {
        if (phone && secondPhone && phone === secondPhone) {
            setError('phone', { type: 'manual', message: 'Telefon raqamlar takrorlanmasligi kerak' });
            setError('secondPhone', { type: 'manual', message: 'Telefon raqamlar takrorlanmasligi kerak' });
        } else if (phone && thirdPhone && phone === thirdPhone) {
            setError('phone', { type: 'manual', message: 'Telefon raqamlar takrorlanmasligi kerak' });
            setError('thirdPhone', { type: 'manual', message: 'Telefon raqamlar takrorlanmasligi kerak' });
        } else if (secondPhone && thirdPhone && secondPhone === thirdPhone) {
            setError('secondPhone', { type: 'manual', message: 'Telefon raqamlar takrorlanmasligi kerak' });
            setError('thirdPhone', { type: 'manual', message: 'Telefon raqamlar takrorlanmasligi kerak' });
        } else {
            clearErrors(['phone', 'secondPhone', 'thirdPhone']);
        }
    }, [phone, secondPhone, thirdPhone, setError, clearErrors]);

    return (
        <form className={cls.form} onSubmit={handleSubmit(onSubmit)}>
            <h2 className={cls.form__title}>Sotuv forma</h2>
            <div className={cls.form__inputs}>
                <FormInput
                    label='Ismi'
                    placeholder='Kiriting'
                    register={register('firstName')}
                    error={errors?.firstName?.message}
                />
                <FormInput
                    label='Familiyasi'
                    placeholder='Kiriting'
                    register={register('lastName')}
                    error={errors?.lastName?.message}
                />
                <FormSelect
                    label='Kursni tanlang'
                    placeholder='Kursni tanlang'
                    name='course'
                    control={control}
                    options={courseOptions}
                    error={errors?.course?.message}
                />
                <FormSelect
                    label='Qancha muddat to’lov olindi*'
                    placeholder='Muddatni tanlang'
                    name='month'
                    control={control}
                    options={coursePeriod}
                    error={errors?.month?.message}
                />
                <FormPhoneInput
                    label='Asosiy raqamni tanlang'
                    placeholder='Telefon nomerni kiriting'
                    name='phone'
                    control={control}
                    error={errors?.phone?.message}
                />
                <FormPhoneInput
                    label='Telefon nomerni kiriting'
                    placeholder='Telefon nomerni kiriting'
                    disabled={!phone}
                    name='secondPhone'
                    control={control}
                    error={errors?.secondPhone?.message}
                />
                <FormPhoneInput
                    label='Telefon nomerni kiriting'
                    placeholder='Telefon nomerni kiriting'
                    disabled={!secondPhone}
                    name='thirdPhone'
                    control={control}
                    error={errors?.thirdPhone?.message}
                />
                <FormRadioGroup
                    label='Jinsi'
                    name='gender'
                    register={register('gender', {valueAsNumber: true})}
                    options={GENDER_OPTIONS}
                    error={errors?.gender?.message}
                />
            </div>
            <Button type='submit' isLoading={isSubmitting}>Yuborish</Button>
        </form>
    );
}

export default SaleForm;