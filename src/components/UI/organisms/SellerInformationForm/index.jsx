import { useNavigate } from "react-router-dom"
import Button from "../../atoms/Buttons/Button"
import RedButton from "../../atoms/Buttons/RedButton"
import AvatarUpload from "../../moleculs/AvatarUpload"
import FormDatepicker from "../../moleculs/Form/FormDatepicker"
import FormInput from "../../moleculs/Form/FormInput"
import FormSelect from "../../moleculs/Form/FormSelect"
import cls from "./SellerInformationForm.module.scss"

const SellerInformationForm = () => {
    const navigate = useNavigate()

    return (
        <form className={cls.form}>
            <div className={cls.form__header}>
                <AvatarUpload
                    // value={avatar instanceof File ? URL.createObjectURL(avatar) : avatar}
                    // disabled={!isEditable}
                    // onChange={file => setValue('avatar', file, { shouldDirty: true, shouldValidate: true })}
                    // onDelete={() => setValue('avatar', null, { shouldDirty: true })}
                />
            </div>
            <div className={cls.form__elements}>
                <FormInput
                    label='Ismi'
                    placeholder='Ismi'
                />
                <FormInput
                    label='Familyasi'
                    placeholder='Familyasi'
                />
                <FormDatepicker
                    label='Tug’ilgan kuni'
                    placeholder='Tug’ilgan kuni'
                />
                <FormInput
                    label='Passport Seriyasi'
                    placeholder='AA0123456789'
                />
                <FormSelect
                    label="Statusi"
                    defaultValue={"Ishlayapti"}
                />
                <FormInput
                    label='SIP'
                    placeholder='123456'
                />
                <FormInput
                    label='Amo CRM ID'
                    placeholder='123456'
                />
                <FormInput
                    label='Doimiy Yashash Manzili'
                    placeholder='AA0123456789'
                />
            </div>
            <div className={cls.form__btns}>
                    <Button
                        type='submit'
                    >
                        Tahrirlash
                    </Button>
                    <RedButton onClick={() => navigate(-1)}>
                        Bekor qilish
                    </RedButton>
                </div>
        </form>
    )
}

export default SellerInformationForm