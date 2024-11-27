import { useForm } from 'react-hook-form';
import cls from './SingleScheduleForm.module.scss';
import { yupResolver } from '@hookform/resolvers/yup';
import { scheduleSchema } from '@/schemas/schedule';
import FormSelect from '../../moleculs/Form/FormSelect';
import FormInput from '../../moleculs/Form/FormInput';
import { DEGREEOPTIONS, WEEKDAYOPTIONS } from '@/constants';
import Button from '../../atoms/Buttons/Button';
const SingleScheduleForm = ({
    defaultValues,
    onSubmit,
    submitBtn="O'zgartirish",
}
) => {
    const { register, control, handleSubmit,formState: { errors } } = useForm({
        defaultValues,
        mode: 'onSubmit',
        resolver: yupResolver(scheduleSchema)
    })
    return (
        <form className={cls.form} onSubmit={handleSubmit(onSubmit)}>
            <FormSelect
                className={cls.form__field}
                name="degree"
                key={1}
                isClearable={true}
                control={control}
                options={DEGREEOPTIONS}
                placeholder='Darajasi'
                label='Darajasi'
                error={errors?.degree?.message}
            />
            <FormSelect
                className={cls.form__field}
                name="weekday"
                key={2}
                isClearable={true}
                control={control}
                options={WEEKDAYOPTIONS}
                placeholder='Kiriting'
                label='Sana'
                error={errors?.weekday?.message}
            />
            <FormInput
                className={cls.form__field}
                label='Dars boshlanish vaqti'
                placeholder='Kiriting'
                type="time"
                register={{ ...register('time') }}
                error={errors?.time?.message}
            />
            <FormInput
                className={cls.form__field}
                label='Dars tugash vaqti'
                placeholder='Kiriting'
                type="time"
                register={{ ...register('endTime') }}
                error={errors?.endTime?.message}
            />
            <div >
                <Button className={cls.form__btn} type='submit'>{submitBtn}</Button>
            </div>
        </form>
    )
}
export default SingleScheduleForm;