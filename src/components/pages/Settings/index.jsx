import toast from "react-hot-toast"
import { useForm } from "react-hook-form"
import { useQueryClient } from "react-query"
import useGetUser from "@/hooks/useGetUser"
import { objectToFormData } from "@/utils/lib"
import { updateEmployee } from "@/services/user"
import { GENDER_OPTIONS } from "@/constants/form"
import { employeeSchema } from "@/schemas/employee"
import { yupResolver } from "@hookform/resolvers/yup"
import Button from "@/components/UI/atoms/Buttons/Button"
import FormInput from "@/components/UI/moleculs/Form/FormInput"
import RedButton from "@/components/UI/atoms/Buttons/RedButton"
import AvatarUpload from "@/components/UI/moleculs/AvatarUpload"
import FormPhoneInput from "@/components/UI/moleculs/Form/FormPhoneInput"
import FormRadioGroup from "@/components/UI/moleculs/Form/FormRadioGroup"
import FormDatepicker from "@/components/UI/moleculs/Form/FormDatepicker"
import cls from "./Settings.module.scss"

const sanitizeEmployeeData = (employee) => {
    return {
        avatar: employee?.url,
        firstName: employee?.firstName,
        lastName: employee?.lastName,
        birthday: employee?.birthday,
        gender: String(employee?.gender),
        phone: employee?.phone
    }
}

const Settings = () => {
    const queryClient = useQueryClient()
    const { data: employee } = useGetUser()
    const { register, control, watch, reset, handleSubmit, formState: { isDirty, isSubmitting, errors } } = useForm({
        mode: 'onSubmit',
        resolver: yupResolver(employeeSchema),
        defaultValues: sanitizeEmployeeData(employee)
    })

    const handleUpdateEmployee = async (data) => {
        try {
            const fd = objectToFormData(data)
            const updatedEmployee = await updateEmployee(employee?.id, fd)
            queryClient.setQueryData(['user-info'], updatedEmployee)
            reset(sanitizeEmployeeData(updatedEmployee))
            toast.success('Malumotlar ozgartirildi')
        } catch (error) {
            const errorMessage = error?.response?.data?.message || error?.message || 'Xatolik yuz berdi'
            toast.error(errorMessage)
        }
    }

    return (
        <div className={cls.page}>
            <form className={cls.page__form} onSubmit={handleSubmit(handleUpdateEmployee)}>
                <div className={cls.page__form__avatar}>
                    <AvatarUpload />
                </div>
                <div className={cls.page__form__inputs}>
                    <FormInput
                        label="Ismi"
                        placeholder='Ismi'
                        register={{ ...register('firstName') }}
                        error={errors?.firstName?.message}
                    />
                    <FormInput
                        label="Familyasi"
                        placeholder='Familyasi'
                        register={{ ...register('lastName') }}
                        error={errors?.lastName?.message}
                    />
                    <FormPhoneInput
                        name="phone"
                        control={control}
                        label="Telefon nomer"
                        placeholder='Telefon nomer'
                        error={errors?.phone?.message}
                    />
                    <FormRadioGroup
                        label="Jinsi"
                        name="gender"
                        options={GENDER_OPTIONS}
                        register={{ ...register('gender') }}
                        error={errors?.gender?.message}
                    />
                    <FormDatepicker
                        label="Tug’ilgan sanasi"
                        placeholder='Tug’ilgan sanasi'
                        control={control}
                        name="birthday"
                        error={errors?.birthday?.message}
                    />
                </div>
                <div className={cls.page__form__btns}>
                    <Button 
                        type="submit"
                        isLoading={isSubmitting}
                        disabled={!isDirty}
                    >
                        Tahrirlash
                    </Button>
                    <RedButton
                        disabled={!isDirty}
                        onClick={reset}
                    >
                        Bekor qilish
                    </RedButton>
                </div>
            </form>
        </div>
    )
}

export default Settings