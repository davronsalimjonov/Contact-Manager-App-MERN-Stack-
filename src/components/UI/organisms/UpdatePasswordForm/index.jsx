import toast from "react-hot-toast"
import { useForm } from "react-hook-form"
import { passwordSchema } from "@/schemas/employee"
import { yupResolver } from "@hookform/resolvers/yup"
import { useUpdateSelfPasswordMutation } from "@/hooks/useEmployee"
import Button from "../../atoms/Buttons/Button"
import FormPasswordInput from "../../moleculs/Form/FormPasswordInput"
import cls from "./UpdatePasswordForm.module.scss"

const UpdatePasswordForm = ({ employee }) => {
    const changePasswordMutation = useUpdateSelfPasswordMutation()
    const { register, handleSubmit, reset, formState: { errors, isSubmitting, isDirty } } = useForm({ mode: 'onSubmit', resolver: yupResolver(passwordSchema) })

    const handleUpdatePassword = async (payload) => {
        const { confirmPassword, ...filteredData } = payload;

        filteredData.id = employee?.id;
        filteredData.role = String(employee?.role);

        await changePasswordMutation.mutateAsync(filteredData, {
            onSuccess: () => {
                toast.success('Parol o\'zgartirildi');
                reset()
            },
            onError: (err) => toast.error(err?.response?.data?.message || 'Xatolik yuz berdi'),
        });
    };

    return (
        <form className={cls.passwordForm} onSubmit={handleSubmit(handleUpdatePassword)}>
            <h2>Parolni Tahrirlash</h2>
            <div className={cls.passwordForm__inputs}>
                <FormPasswordInput
                    label="Eski parol"
                    placeholder="Kiriting"
                    register={register('oldPassword')}
                    error={errors.oldPassword?.message}
                    className={cls.customInput}
                />
                <FormPasswordInput
                    label="Yangi parol"
                    placeholder="Kiriting"
                    register={register('newPassword')}
                    error={errors.newPassword?.message}
                    className={cls.customInput}
                />
                <FormPasswordInput
                    label="Qayta kiriting"
                    placeholder="Kiriting"
                    register={register('confirmPassword')}
                    error={errors.confirmPassword?.message}
                    className={cls.customInput}
                />
            </div>
            <Button 
                type="submit"
                disabled={!isDirty}
                isLoading={isSubmitting}
                className={cls.passwordForm__btn} 
            >
                Tahrirlash
            </Button>
        </form>
    )
}

export default UpdatePasswordForm