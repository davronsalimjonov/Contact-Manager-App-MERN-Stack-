import { useState } from "react"
import Button from "../../atoms/Buttons/Button"
import RedButton from "../../atoms/Buttons/RedButton"
import Dialog from "../../moleculs/Dialog"
import FormPasswordInput from "../../moleculs/Form/FormPasswordInput"
import cls from "./QualityControlChangePasswordForm.module.scss"

const QualityControlChangePasswordForm = ({
    isOpen = false,
    onClose,
    setIsOpen,
    onSubmit
}) => {
    const [isSure, setIsSure] = useState(false)

    return (
        <Dialog isOpen={isOpen} onClose={onClose}>
            <form className={cls.form}>
                {isSure ? <>
                    <div className={cls.form__confirm}>
                        <h2>Rostan ham parolni o'zgartirmoxchimisiz?</h2>
                        <div className={cls.form__confirm__buttons}>
                            <Button type="submit" className={cls.form__confirm__btns__confirm}>Ha</Button>
                            <RedButton onClick={() => {
                                setIsOpen({ isOpen: false })
                                setTimeout(() => {
                                    setIsSure(false)
                                }
                                , 300)
                            }} className={cls.form__confirm__btns__refuse}>Yo'q</RedButton>
                        </div>
                    </div>
                </> : <>
                    <div className={cls.form__changePsw}>
                        <h2>Parolni O'zgartirish</h2>
                        <FormPasswordInput
                            label="Parolni o'zgartirish"
                            placeholder="15547526"
                        />
                        <div>
                            <Button onClick={() => setIsSure(true)}>Yangilash</Button>
                        </div>
                    </div>
                </>}
            </form>
        </Dialog>
    )
}

export default QualityControlChangePasswordForm