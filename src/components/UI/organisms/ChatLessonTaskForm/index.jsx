import { useFormContext } from 'react-hook-form';
import { AutoRenewIcon } from '../../atoms/icons';
import cls from './ChatLessonTaskForm.module.scss';

const ChatLessonTaskForm = () => {
    const { register, setValue, watch } = useFormContext()
    const file = watch('file')

    const handleChangeFileInput = (e) => {
        const selectedFile = e.target.files[0]
        setValue('file', selectedFile, { shouldDirty: true, shouldValidate: true })
    }

    return (
        <div className={cls.form}>
            <label>
                <span>Vazifa nomi:</span>
                <input type="text" {...register('title', { required: true })} />
            </label>
            <label className={cls.form__file}>
                <span>Fayl:</span>
                <input type="file" onChange={handleChangeFileInput} />
                {file ? (
                    <>
                        <span className={cls.form__file__name}>{file.name}</span>
                        <div><AutoRenewIcon /></div>
                    </>
                ) : (
                    <span>Yuklash</span>
                )}
            </label>
            <label>
                <span>Description:</span>
                <textarea {...register('description')}></textarea>
            </label>
        </div>
    );
}

export default ChatLessonTaskForm;