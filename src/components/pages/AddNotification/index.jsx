import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { GENDER_OPTIONS } from '@/constants/form';
import { studentInfoSchema } from '@/schemas/student';
import Button from '@/components/UI/atoms/Buttons/Button';
import FormInput from '@/components/UI/moleculs/Form/FormInput';
import RedButton from '@/components/UI/atoms/Buttons/RedButton';
import AvatarUpload from '@/components/UI/moleculs/AvatarUpload';
import FormDatepicker from '@/components/UI/moleculs/Form/FormDatepicker';
import FormPhoneInput from '@/components/UI/moleculs/Form/FormPhoneInput';
import FormRadioGroup from '@/components/UI/moleculs/Form/FormRadioGroup';
import { LeftArrowIcon } from '@/components/UI/atoms/icons';
import cls from './AddNotification.module.scss';
import { customToast } from '@/utils/toast';
import { objectToFormData } from '@/utils/lib';
import { AddNotification } from '@/services/user';
import { useNavigate } from 'react-router-dom';
import { queryClient } from '@/services/api';

const AddNotification = ({ }) => {

    const defaultValues = {
        firstName: "",
        lastName: "",
        phone: "",
        gender: "",
        birthday: "",
    }

    const navigate = useNavigate();

    const { register, control, reset, watch, handleSubmit, setValue, getValues, formState: { isDirty, errors, isSubmitting, isSubmitSuccessful } } = useForm({
        defaultValues,
        mode: 'onSubmit',
        resolver: yupResolver(studentInfoSchema)
    })
    const avatar = watch('avatar');


    const handleAddNotification = async (data) => {
        try {
            delete data.createdAt;
            data.phone = data.phone
            data.gender = Number(data.gender)

            // if (!(data?.avatar instanceof File) && data?.avatar !== null) delete data.avatar
            delete data.avatar;
            // const fd = objectToFormData(data)

            const addedUser = await AddNotification(data);
            queryClient.setQueryData(['student'], addedUser);
            reset(defaultValues);

            toast.success("Yangi o'quvchi qo'shildi")
        } catch (error) {
            const res = error?.response?.data
            customToast.error(res?.message || error?.message || 'Xatolik yuz berdi')
        }
    }


    return (
        <>
            <form className={cls.form} onSubmit={handleSubmit(handleAddNotification)}>
                <div className={cls.form__header}>
                    <button
                        type='button'
                        onClick={() => navigate('/students')}
                        className={cls.form__header__btn}
                    >
                        <LeftArrowIcon />
                    </button>
                    <AvatarUpload
                        value={avatar instanceof File ? URL.createObjectURL(avatar) : avatar}
                        onChange={file => setValue('avatar', file, { shouldDirty: true, shouldValidate: true })}
                        onDelete={() => setValue('avatar', null, { shouldDirty: true })}
                    />
                    <span></span>
                </div>
                <div className={cls.form__elements}>
                    <FormInput
                        label='Eslatma nomi'
                        placeholder='Ismi'
                        register={{ ...register('firstName') }}
                        error={errors?.firstName?.message}
                    />

                    <FormSelect
                        className={cls.field}
                        control={control}
                        name='unit'
                        rules={{ require: 'Mavzuni tanlang' }}
                        options={UNITS}
                        label='Holati'
                        placeholder='Holati'
                        error={errors?.word?.message}
                    />

                    <Textarea
                        className={cls.form__input}
                        label="Matn"
                        register={{ ...register('description') }}
                        error={errors?.description?.message}
                    />

                    <div className={cls.form__buttons}>
                        <Button
                            type='submit'
                            isLoading={isSubmitting}
                            disabled={!isDirty}
                        >Qo'shish</Button>
                        <RedButton
                            disabled={!isDirty}
                            onClick={() => reset(defaultValues)}
                        >
                            Bekor qilish
                        </RedButton>
                    </div>
                </div>
            </form>
        </>
    );
}

export default AddNotification;