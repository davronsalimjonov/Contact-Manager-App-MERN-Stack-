import Button from "../../atoms/Buttons/Button"
import { CloseIcon } from "../../atoms/icons"
import Dialog from "../../moleculs/Dialog"
import FormDatepicker from "../../moleculs/Form/FormDatepicker"
import FormInput from "../../moleculs/Form/FormInput"
import FormPhoneInput from "../../moleculs/Form/FormPhoneInput"
import FormRadioGroup from "../../moleculs/Form/FormRadioGroup"
import cls from "./QualityControlAddUserForm.module.scss"
import { GENDER_OPTIONS } from "@/constants/form"
import { useForm } from "react-hook-form"
import { useEffect } from "react"
import { yupResolver } from "@hookform/resolvers/yup"
import { qualityControlEmployeeSchema } from "@/schemas/quality"

const QualityControlAddUserForm = ({
    isOpen = false,
    setIsOpen,
    onSubmit
}) => {
    const { register, handleSubmit, control, reset, formState: { isDirty, errors, isSubmitting, isSubmitSuccessful } } = useForm({
        resolver: yupResolver(qualityControlEmployeeSchema),
        mode: 'onSubmit',
    })

    useEffect(() => {
        if (isSubmitSuccessful) {
            setIsOpen({ isOpen: false })
            reset()
        }
    } ,[isSubmitSuccessful])

    return (
        <Dialog isOpen={isOpen}>
            <form className={cls.form} onSubmit={handleSubmit(onSubmit)}>
                <div className={cls.form__header}>
                    <h2>Xodim Qo'shish</h2>
                    <div onClick={() => {
                        setIsOpen({ isOpen: false })
                        reset()
                    }} className={cls.form__header__close}>
                        <CloseIcon />
                    </div>
                </div>
                <FormInput
                    label="Ismi"
                    placeholder={'Ismi'}
                    register={register('firstName', { required: true })}
                    error={errors?.firstName?.message}
                />
                <FormInput
                    label="Familiyasi"
                    placeholder={'Familiyasi'}
                    register={register('lastName', { required: true })}
                    error={errors?.lastName?.message}
                />
                <FormPhoneInput
                    label="Telefon Raqami"
                    placeholder={'Raqami'}
                    name='phone'
                    control={control}
                    error={errors?.phone?.message}
                />
                <FormDatepicker
                    label="Tug'ilgan kuni"
                    placeholder={'dd.mm.yy'}
                    control={control}
                    name="birthday"
                    error={errors?.birthday?.message}
                />
                <FormRadioGroup
                    label="Jinsi"
                    options={GENDER_OPTIONS}
                    name="gender"
                    register={register('gender', { required: true })}
                    error={errors?.gender?.message}
                />
                <Button 
                    type="submit"
                    isLoading={isSubmitting}
                    disabled={!isDirty || isSubmitting}
                >Qo'shish</Button>
            </form>
        </Dialog>
    )
}

export default QualityControlAddUserForm