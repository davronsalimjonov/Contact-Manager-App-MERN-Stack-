import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import Button from "../../atoms/Buttons/Button"
import RedButton from "../../atoms/Buttons/RedButton"
import Dialog from "../../moleculs/Dialog"
import FormPasswordInput from "../../moleculs/Form/FormPasswordInput"
import cls from "./QualityControlChangePasswordForm.module.scss"
import { sellerSchema } from "@/schemas/employee"

const QualityControlChangePasswordForm = ({
    isOpen = false,
    onClose,
    setIsOpen,
    onSubmit
}) => {
    const [isSure, setIsSure] = useState(false)
    const { register, handleSubmit, reset, formState: { isDirty, errors, isSubmitting, isSubmitSuccessful } } = useForm()

    useEffect(() => {
        if (isSubmitSuccessful) {
            onClose()
            setTimeout(() => {
                setIsSure(false)
                reset()
            }, 300)
        }
    }
        , [isSubmitSuccessful])

    return (
        <Dialog isOpen={isOpen} onClose={() => {
            onClose()
            setIsSure(false)
            reset()
        }}>
            <form className={cls.form} onSubmit={handleSubmit(onSubmit)}>
                {isSure ? <>
                    <div className={cls.form__confirm}>
                        <h2>Rostan ham parolni o'zgartirmoxchimisiz?</h2>
                        <div className={cls.form__confirm__buttons}>
                            <Button
                                type="submit"
                                className={cls.form__confirm__btns__confirm}
                                isLoading={isSubmitting}
                            >Ha</Button>
                            <RedButton onClick={() => {
                                setIsOpen({ isOpen: false })
                                setTimeout(() => {
                                    setIsSure(false)
                                }, 300)
                                reset()
                            }} className={cls.form__confirm__btns__refuse}>Yo'q</RedButton>
                        </div>
                    </div>
                </> : <>
                    <div className={cls.form__changePsw}>
                        <h2>Parolni O'zgartirish</h2>
                        <FormPasswordInput
                            label="Parolni o'zgartirish"
                            placeholder="15547526"
                            register={register('password')}
                            error={errors?.password?.message}
                        />
                        <div>
                            <Button
                                onClick={() => setIsSure(true)}
                                disabled={!isDirty}
                            >Yangilash</Button>
                        </div>
                    </div>
                </>}
            </form>
        </Dialog>
    )
}

export default QualityControlChangePasswordForm