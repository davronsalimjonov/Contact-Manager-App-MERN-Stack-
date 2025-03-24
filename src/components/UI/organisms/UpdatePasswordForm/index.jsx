import Button from "../../atoms/Buttons/Button"
import FormPasswordInput from "../../moleculs/Form/FormPasswordInput"
import cls from "./UpdatePasswordForm.module.scss"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { updateSelfPasswordMutation } from "@/hooks/useUsers"
import toast from "react-hot-toast"
import { passwordSchema } from "@/schemas/employee"

const UpdatePasswordForm = ({
    employee
}) => {
    const changePasswordMutation = updateSelfPasswordMutation()
    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm({
        mode: 'onSubmit',
        resolver: yupResolver(passwordSchema),
        defaultValues: {
            oldPassword: "",
            newPassword: "",
            confirmPassword: "",
        }
    })

    const newPassword = watch("newPassword");
    const confirmPassword = watch("confirmPassword");

    const handleUpdatePassword = async (payload) => {
        const { confirmPassword, ...filteredData } = payload; 
        
        filteredData.id = employee?.id;
        filteredData.role = String(employee?.role);

        console.log(filteredData, 'filteredData');
        

        await changePasswordMutation.mutateAsync(filteredData, {
            onSuccess: () => {
                toast.success('Parol o\'zgartirildi');
                reset()
            },
            onError: (err) => toast.error(err?.response?.data?.message || 'Xatolik yuz berdi'),
        });
    };
    

    console.log(newPassword, confirmPassword, 'passwords');
    

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
            <div className={cls.passwordForm__btn}>
                <button></button>
                <Button type="submit">Tahrirlash</Button>
            </div>
        </form>
    )
}

export default UpdatePasswordForm