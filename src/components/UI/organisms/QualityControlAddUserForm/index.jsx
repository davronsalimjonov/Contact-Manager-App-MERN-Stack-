import { EMPLOYEE_STATUS_ENUMS } from "@/constants"
import Button from "../../atoms/Buttons/Button"
import { CloseIcon } from "../../atoms/icons"
import Dialog from "../../moleculs/Dialog"
import FormDatepicker from "../../moleculs/Form/FormDatepicker"
import FormInput from "../../moleculs/Form/FormInput"
import FormPhoneInput from "../../moleculs/Form/FormPhoneInput"
import FormRadioGroup from "../../moleculs/Form/FormRadioGroup"
import FormSelect from "../../moleculs/Form/FormSelect"
import cls from "./QualityControlAddUserForm.module.scss"
import EmployeeStatusBadge from "../../atoms/EmployeeStatusBadge"
import { GENDER_OPTIONS } from "@/constants/form"

const QualityControlAddUserForm = ({
    isOpen=false,
    setIsOpen,
    onSubmit
}) => {
    const statusOptions = EMPLOYEE_STATUS_ENUMS.map((status) => ({ value: status, label: <EmployeeStatusBadge className={cls.statusBadge} status={status} />  }))

    return (
        <Dialog isOpen={isOpen}>
            <form className={cls.form}>
                <div className={cls.form__header}>
                    <h2>Xodim Qo'shish</h2>
                    <div onClick={() => setIsOpen({ isOpen: false })} className={cls.form__header__close}>
                        <CloseIcon />
                    </div>
                </div>
                <FormInput
                    label="Ismi"
                    placeholder={'Ismi'}
                />
                <FormInput
                    label="Familiyasi"
                    placeholder={'Familiyasi'}
                />
                <FormPhoneInput
                    label="Telefon Raqami"
                    placeholder={'Raqami'}
                />
                <FormDatepicker
                    label="Tug'ilgan kuni"
                    placeholder={'dd.mm.yy'}
                />
                <FormRadioGroup
                    label="Jinsi"
                    options={GENDER_OPTIONS}
                />
                <FormSelect
                    label="Status"
                    placeholder="Tanlang"
                    options={statusOptions}
                />
                <Button type="submit">Qo'shish</Button>
            </form>
        </Dialog>
    )
}

export default QualityControlAddUserForm