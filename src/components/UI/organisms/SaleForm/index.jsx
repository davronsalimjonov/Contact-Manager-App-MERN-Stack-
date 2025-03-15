import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { GENDER_OPTIONS, PAYMENT_TYPE_OPTIONS, SALE_TYPE_OPTIONS } from '@/constants/form';
import { formatPrice } from '@/utils/lib';
import { saleFormSchema } from '@/schemas/seller';
import { yupResolver } from '@hookform/resolvers/yup';
import Button from '../../atoms/Buttons/Button';
import { useGetCourses } from '@/hooks/useUserCourse';
import FormInput from '../../moleculs/Form/FormInput';
import FormSelect from '../../moleculs/Form/FormSelect';
import FormPhoneInput from '../../moleculs/Form/FormPhoneInput';
import FormRadioGroup from '../../moleculs/Form/FormRadioGroup';
import FormFilePicker from '../../moleculs/Form/FormFilePicker';
import FormDatepicker from '../../moleculs/Form/FormDatepicker';
import Checkbox from '../../atoms/Form/Checkbox';
import FormTextArea from '../../moleculs/Form/FormTextArea';
import cls from './SaleForm.module.scss';

const SaleForm = ({ onSubmit }) => {
    const { data: courseForSelect } = useGetCourses()
    const { register, formState: { errors, isSubmitting, isSubmitSuccessful }, control, handleSubmit, watch, setError, setValue, clearErrors, reset } = useForm({ 
        mode: 'onSubmit', 
        resolver: yupResolver(saleFormSchema) 
    })

    const file = watch('file')
    const phone = watch('phone');
    const secondPhone = watch('secondPhone');
    const thirdPhone = watch('thirdPhone');

    const courseOptions = courseForSelect?.map(({ title, id }) => ({ label: title, value: id }))
    const coursePeriod = Array(7).fill(null).map((_, index) => ({ label: `${index} oy`, value: index }))

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
                <FormRadioGroup
                    label='Jinsi'
                    name='gender'
                    register={register('gender', { valueAsNumber: true })}
                    options={GENDER_OPTIONS}
                    error={errors?.gender?.message}
                />
                <FormInput
                    label='Telegram akkaunt'
                    placeholder='Kiriting'
                    register={register('telegram')}
                    error={errors?.telegram?.message}
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
                <FormSelect
                    label='Kursni tanlang'
                    placeholder='Kursni tanlang'
                    name='course'
                    control={control}
                    options={courseOptions}
                    error={errors?.course?.message}
                />
                <FormSelect
                    label="Sotuv turi"
                    placeholder="Sotuv turi"
                    options={SALE_TYPE_OPTIONS}
                    name='userType'
                    control={control}
                    error={errors?.userType?.message}
                />
                <FormSelect
                    label="To'lov turi"
                    placeholder="To'lov turi"
                    options={PAYMENT_TYPE_OPTIONS}
                    name='paymentType'
                    control={control}
                    error={errors?.paymentType?.message}
                />
                <FormInput
                    label='Summani kiriting'
                    placeholder='Summani kiriting'
                    register={register('paymentAmount', { onChange: e => e.target.value = formatPrice(e.target.value) })}
                    error={errors?.paymentAmount?.message}
                />
                <FormSelect
                    label='Qancha muddat to’lov olindi*'
                    placeholder='Muddatni tanlang'
                    name='month'
                    control={control}
                    options={coursePeriod}
                    error={errors?.month?.message}
                />
                <FormFilePicker
                    key={file?.name}
                    defaultFile={file}
                    label="To'lov chekini yuklash"
                    placeholder='Yuklash'
                    accept='image/*, .pdf'
                    onChange={file => setValue('file', file, { shouldValidate: true, shouldDirty: true })}
                    error={errors?.file?.message}
                />
                <FormDatepicker
                    label='Sanani kiriting'
                    defaultValue={new Date(Date.now())}
                    showTimeInput
                    name='date'
                    control={control}
                    error={errors?.date?.message}
                />
                <FormTextArea
                    label='Izoh'
                    placeholder='Kiriting'
                    wrapperClassName={cls.form__textarea}
                    register={register('comment')}
                    error={errors?.comment?.message}
                />
                <Checkbox
                    label='Call-center'
                    defaultChecked={false}
                    register={register('callCenter')}
                />
            </div>
            <Button type='submit' isLoading={isSubmitting}>Yuborish</Button>
        </form>
    );
}

export default SaleForm;