import { useNavigate, useParams } from "react-router-dom"
import Button from "../../atoms/Buttons/Button"
import RedButton from "../../atoms/Buttons/RedButton"
import AvatarUpload from "../../moleculs/AvatarUpload"
import FormDatepicker from "../../moleculs/Form/FormDatepicker"
import FormInput from "../../moleculs/Form/FormInput"
import FormSelect from "../../moleculs/Form/FormSelect"
import cls from "./SellerInformationForm.module.scss"
import { useUpdateSellerMutation } from "@/hooks/useSeller"
import { useForm } from "react-hook-form"
import { objectToFormData, removeEmptyKeys } from "@/utils/lib"
import toast from "react-hot-toast"
import { MENTOR_STATUS_OPTIONS } from "@/constants/form"

const SellerInformationForm = () => {
    const navigate = useNavigate()
    const updateSeller = useUpdateSellerMutation()
    const params = useParams()
    const sellerId = params?.sellerId
    const { register, control, reset, watch, handleSubmit, setValue, formState: { isDirty, errors, isSubmitting } } = useForm({
        mode: 'onSubmit'
    })
    const avatar = watch('avatar')

    const onSubmit = async (data) => {
        const updateSellerInfo = { ...data }
    
        if (!updateSellerInfo?.birthday) delete updateSellerInfo.birthday
        if (!(updateSellerInfo?.avatar instanceof File) && updateSellerInfo?.avatar !== null) delete updateSellerInfo.avatar
    
        const fd = objectToFormData(removeEmptyKeys(updateSellerInfo))
    
        await updateSeller.mutateAsync({ sellerId, data: fd }, { 
            onSuccess: () => {
                toast.success("Ma'lumotlar Saqlandi")
                reset()
            },
            onError: (err) => toast.error(err?.response?.data?.message || 'Xatolik yuz berdi')
        })
    }
    

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
                    register={{ ...register('firstName') }}
                    error={errors?.firstName?.message}
                />
                <FormInput
                    label='Familyasi'
                    placeholder='Familyasi'
                    register={{ ...register('lastName') }}
                    error={errors?.lastName?.message}
                />
                <FormDatepicker
                    name="birthday"
                    label='Tug’ilgan kuni'
                    placeholder='Tug’ilgan kuni'
                    control={control}
                    error={errors?.birthday?.message}
                />
                <FormInput
                    label='Passport Seriyasi'
                    placeholder='AA0123456789'
                    register={{ ...register('passport')}}
                    error={errors?.passport?.message}
                />
                <FormSelect
                    label="Statusi"
                    options={MENTOR_STATUS_OPTIONS}
                    register={{ ...register('status')}}
                    error={errors?.status?.message}
                    isSearchable
                    isclearable
                />
                <FormInput
                    label='SIP'
                    placeholder='123456'
                    register={{ ...register('sip')}}
                    error={errors?.status?.message}
                />
                <FormInput
                    label='Amo CRM ID'
                    placeholder='123456'
                    register={{ ...register('amocrmId')}}
                    error={errors?.status?.message}
                />
                <FormInput
                    label='Doimiy Yashash Manzili'
                    placeholder='AA0123456789'
                    register={{ ...register('addresss')}}
                    error={errors?.addresss?.message}
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
                <RedButton type="button" onClick={() => {
                    navigate(-1)
                    reset()
                }}>
                    Bekor qilish
                </RedButton>
            </div>
        </form>
    )
}

export default SellerInformationForm