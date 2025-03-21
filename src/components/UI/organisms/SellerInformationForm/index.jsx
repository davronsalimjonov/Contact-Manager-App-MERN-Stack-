import { useEffect } from "react"
import toast from "react-hot-toast"
import { useForm } from "react-hook-form"
import { GENDER_OPTIONS, MENTOR_STATUS_OPTIONS } from "@/constants/form"
import { sellerSchema } from "@/schemas/employee"
import { EMPLOYEE_ROLES } from "@/constants/enum"
import { yupResolver } from "@hookform/resolvers/yup"
import { useUpdateSellerMutation } from "@/hooks/useEmployee"
import { objectToFormData, removeEmptyKeys } from "@/utils/lib"
import Button from "../../atoms/Buttons/Button"
import RedButton from "../../atoms/Buttons/RedButton"
import AvatarUpload from "../../moleculs/AvatarUpload"
import FormInput from "../../moleculs/Form/FormInput"
import FormSelect from "../../moleculs/Form/FormSelect"
import FormMaskInput from "../../moleculs/Form/FormMaskInput"
import FormDatepicker from "../../moleculs/Form/FormDatepicker"
import FormPhoneInput from "../../moleculs/Form/FormPhoneInput"
import FormRadioGroup from "../../moleculs/Form/FormRadioGroup"
import cls from "./SellerInformationForm.module.scss"

const SellerInformationForm = ({ sellerId, defaultValues }) => {
    const updateSeller = useUpdateSellerMutation()
    const { register, control, reset, watch, handleSubmit, setValue, formState: { isDirty, errors, isSubmitting, isSubmitSuccessful } } = useForm({
        defaultValues,
        mode: 'onSubmit',
        resolver: yupResolver(sellerSchema)
    })
    const avatar = watch('avatar')

    const onSubmit = async (data) => {
        const updateSellerInfo = Object.assign({}, data)
        if (!(updateSellerInfo?.avatar instanceof File) && updateSellerInfo?.avatar !== null) delete updateSellerInfo.avatar
        const fd = objectToFormData(removeEmptyKeys(updateSellerInfo))

        await updateSeller.mutateAsync({ id: sellerId, body: fd, params: { role: EMPLOYEE_ROLES.SELLER } }, { 
            onSuccess: () => toast.success("Ma'lumotlar saqlandi"),
            onError: (err) => toast.error(err?.response?.data?.message || 'Xatolik yuz berdi')
        })
    }

    const handleChangePassportField = (e) => {
        const upperCaseValue = e.target.value.toUpperCase();    
        e.target.value = upperCaseValue;
    }

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset(defaultValues)
        }
    }, [isSubmitSuccessful])

    return (
        <form className={cls.form} onSubmit={handleSubmit(onSubmit)}>
            <div className={cls.form__header}>
                <AvatarUpload
                    value={avatar instanceof File ? URL.createObjectURL(avatar) : avatar}
                    onChange={file => setValue('avatar', file, { shouldDirty: true, shouldValidate: true })}
                    onDelete={() => setValue('avatar', null, { shouldDirty: true })}
                />
            </div>
            <div className={cls.form__elements}>
                <FormInput
                    label='Ismi'
                    placeholder='Ismi'
                    register={register('firstName')}
                    error={errors?.firstName?.message}
                />
                <FormInput
                    label='Familyasi'
                    placeholder='Familyasi'
                    register={register('lastName')}
                    error={errors?.lastName?.message}
                />
                <FormPhoneInput 
                    label="Telefon nomer"
                    placeholder="Telefon nomer"
                    name="phone"
                    control={control}
                    error={errors?.phone?.message}
                />
                <FormDatepicker
                    name="birthday"
                    label='Tug’ilgan kuni'
                    placeholder='Tug’ilgan kuni'
                    control={control}
                    error={errors?.birthday?.message}
                />
                <FormRadioGroup
                    label="Jinsi"
                    options={GENDER_OPTIONS}
                    register={register('gender')}
                    error={errors?.gender?.message}
                />
                <FormMaskInput 
                    label='Passport Seriyasi'
                    placeholder='Seriya raqami'
                    mask='aa9999999'
                    maskChar="_"
                    formatChars={{ '9': '[0-9]', 'a': '[A-Za-z]'}}
                    onChange={handleChangePassportField}
                    name="passport"
                    control={control}
                    error={errors?.passport?.message}
                />
                <FormSelect
                    label="Statusi"
                    options={MENTOR_STATUS_OPTIONS}
                    name="status"
                    control={control}                    
                    error={errors?.status?.message}
                    isSearchable
                />
                <FormMaskInput 
                    label='SIP'
                    placeholder='SIP raqami'
                    mask="999"
                    name="sip"
                    control={control}
                    error={errors?.sip?.message}
                />
                <FormMaskInput 
                    label='Amo CRM ID'
                    placeholder='Amo CRM ID'
                    mask="99999999"
                    name="amocrmId"
                    control={control}
                    error={errors?.amocrmId?.message}
                />
                <FormInput
                    label='Doimiy Yashash Manzili'
                    placeholder='Yashash manzili'
                    register={register('address')}
                    error={errors?.address?.message}
                />
            </div>
            <div className={cls.form__btns}>
                <Button
                    type='submit'
                    isLoading={isSubmitting}
                    disabled={!isDirty}
                >
                    Tahrirlash
                </Button>
                <RedButton type="button" onClick={() => reset()}>
                    Bekor qilish
                </RedButton>
            </div>
        </form>
    )
}

export default SellerInformationForm