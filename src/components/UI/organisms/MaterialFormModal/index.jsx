import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { MEDIA_FILES_TYPES } from '@/constants';
import Button from '../../atoms/Buttons/Button';
import Dialog from '../../moleculs/Dialog';
import FormInput from '../../moleculs/Form/FormInput';
import FormTextArea from '../../moleculs/Form/FormTextArea';
import FormFilePicker from '../../moleculs/Form/FormFilePicker';
import cls from './MaterialFormModal.module.scss';

const MaterialFormModal = ({
    isOpen,
    isEditing,
    onClose,
    onSubmit,
    defaultValues
}) => {
    const { register, handleSubmit, reset, formState: { errors, isDirty, isSubmitting, isSubmitSuccessful, dirtyFields }, setValue, getValues } = useForm({ defaultValues });

    const handleSubmitForm = async (data) => {
        const updatedData = Object.keys(dirtyFields).reduce((acc, key) => {
            if (dirtyFields[key]) acc[key] = data[key];
            return acc;
        }, {})
        await onSubmit?.(updatedData);
    }

    useEffect(() => {
        register('file', { required: 'Material kiritilishi shart' })
    }, [])

    useEffect(() => {
        if (isSubmitSuccessful && !isEditing) reset()
    }, [isSubmitSuccessful])

    return (
        <Dialog
            isOpen={isOpen}
            onClose={onClose}
        >
            <form className={cls.form} onSubmit={handleSubmit(handleSubmitForm)}>
                <FormInput
                    label='Sarlavha'
                    placeholder='Sarlavha'
                    register={register('title', { required: 'Sarlavha kiritilishi shart' })}
                    error={errors.title?.message}
                />
                <FormFilePicker
                    label='Material'
                    placeholder='Rasm, pdf, video, audio, doc'
                    accept={MEDIA_FILES_TYPES}
                    onChange={(file) => setValue('file', file, { shouldDirty: true, shouldValidate: true })}
                    defaultFile={getValues('file')}
                    error={errors.file?.message}
                />
                <FormTextArea
                    label='Description'
                    placeholder='Description kiriting'
                    register={register('description')}
                    error={errors.description?.message}
                />
                <Button
                    type='submit'
                    disabled={!isDirty}
                    isLoading={isSubmitting}
                >
                    {isEditing ? 'Saqlash' : 'Qo’shish'}
                </Button>
            </form>
        </Dialog>
    );
}

export default MaterialFormModal;
