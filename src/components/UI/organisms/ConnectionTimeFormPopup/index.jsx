import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { DAY_OF_WEEK_OPTIONS } from '@/constants/form';
import { connectionTimeSchema } from '@/schemas/student';
import Selector from '../../moleculs/Selector';
import Button from '../../atoms/Buttons/Button';
import FormTimeRangaInput from '../../moleculs/Form/FormTimeRangaInput';
import cls from './ConnectionTimeFormPopup.module.scss';

const ConnectionTimeFormPopup = ({
    onSubmit
}) => {
    const { control, watch, setValue, handleSubmit, formState: { errors, isSubmitting } } = useForm({
        resolver: yupResolver(connectionTimeSchema),
        mode: 'onSubmit'
    })

    return (
        <form className={cls.form} onSubmit={handleSubmit(onSubmit)}>
            <Selector
                label='Hafta kunlari'
                items={DAY_OF_WEEK_OPTIONS}
                onChange={value => setValue('days', value, { shouldDirty: true, shouldValidate: true })}
                error={errors?.days?.message}
            />
            <FormTimeRangaInput
                control={control}
                label='Soat (oralig’i)'
                name='connectionTime'
                error={errors?.connectionTime?.message}
            />
            <Button 
                type='submit'
                isLoading={isSubmitting}
            >
                Qo’shish
            </Button>
        </form>
    );
}

export default ConnectionTimeFormPopup;