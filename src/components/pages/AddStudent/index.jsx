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
import cls from './AddStudent.module.scss';
import { customToast } from '@/utils/toast';
import { objectToFormData } from '@/utils/lib';
import { addStudent } from '@/services/user';
import { useNavigate } from 'react-router-dom';
import { queryClient } from '@/services/api';

const AddStudent = ({ }) => {

    const defaultValues = {
        firstName: "",
        lastName: "",
        phone: "",
        gender: "",
        birthday: "",
    }

    const navigate = useNavigate();

    const { register, control, reset, watch, handleSubmit, setValue, formState: { isDirty, errors, isSubmitting, isSubmitSuccessful } } = useForm({
        defaultValues,
        mode: 'onSubmit',
        resolver: yupResolver(studentInfoSchema)
    })
    const avatar = watch('avatar');


    const handleAddStudent = async (data) => {
        try {
            delete data.createdAt;
            data.phone = data.phone
            data.gender = Number(data.gender)

            // if (!(data?.avatar instanceof File) && data?.avatar !== null) delete data.avatar
            delete data.avatar;
            // const fd = objectToFormData(data)

            const addedUser = await addStudent(data);
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
            <form className={cls.form} onSubmit={handleSubmit(handleAddStudent)}>
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
                        label='Ismi'
                        placeholder='Ismi'
                        register={{ ...register('firstName') }}
                        error={errors?.firstName?.message}
                    />
                    <FormInput
                        label='Familyasi'
                        placeholder='Familyasi'
                        register={{ ...register('lastName') }}
                        error={errors?.lastName?.message}
                    />
                    <FormPhoneInput
                        name='phone'
                        placeholder='+998'
                        label='Telefon nomer'
                        control={control}
                        error={errors?.phone?.message}
                    />
                    <FormDatepicker
                        name='birthday'
                        label='Tug’ilgan sanasi'
                        placeholder='Tug’ilgan sanasi'
                        control={control}
                        error={errors?.birthday?.message}
                    />
                    <FormRadioGroup
                        label='Jinsi'
                        options={GENDER_OPTIONS}
                        register={{ ...register('gender') }}
                        error={errors?.gender?.message}
                    />
                    <span></span>

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

export default AddStudent;