import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { MEDIA_FILES_TYPES } from '@/constants';
import Button from '../../atoms/Buttons/Button';
import FormInput from '../../moleculs/Form/FormInput';
import FormTextArea from '../../moleculs/Form/FormTextArea';
import FormMultipleFilePicker from '../../moleculs/Form/FormMultipleFilePicker';
import cls from './LessonHomeworkForm.module.scss';

const LessonHomeworkForm = ({
    onSubmit,
    defaultValues,
    isEditing = false
}) => {
    const { register, setValue, formState: { errors, isSubmitting, isDirty }, handleSubmit } = useForm({ defaultValues })

    useEffect(() => {
        register('files', { required: 'Fayl tanlang' })
    }, [])

    return (
        <form className={cls.form} onSubmit={handleSubmit(onSubmit)}>
            <h1 className={cls.form__title}>{isEditing ? 'Vazifa' : 'Vazifa Yaratish'}</h1>
            <div className={cls.form__elements}>
                <FormInput
                    label="Vazifa nomi"
                    placeholder="Title kiriting"
                    register={register('title', { required: 'Title kiritilishi shart' })}
                    error={errors.title?.message}
                />
                <FormMultipleFilePicker
                    label='Fayl'
                    accept={MEDIA_FILES_TYPES}
                    defaultFiles={defaultValues?.files}
                    placeholder="Fayl tanlang"
                    onChange={files => setValue('files', files, { shouldDirty: true, shouldValidate: true })}
                    error={errors.files?.message}
                />
                <FormTextArea
                    label="Description"
                    placeholder='Description kiriting'
                    register={register('description', { required: 'Description kiritilishi shart' })}
                    error={errors.description?.message}
                />
            </div>
            <Button
                type='submit'
                disabled={!isDirty}
                isLoading={isSubmitting}
                className={cls.form__btn}
            >
                {isEditing ? 'Tahrirlash' : 'Yaratish'}
            </Button>
        </form>
    );
}

export default LessonHomeworkForm;