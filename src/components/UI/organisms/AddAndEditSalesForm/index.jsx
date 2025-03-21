import { MEDIA_PHOTO_TYPES } from "@/constants";
import Dialog from "../../moleculs/Dialog";
import FormInput from "../../moleculs/Form/FormInput";
import FormSelect from "../../moleculs/Form/FormSelect";
import FormFilePicker from "../../moleculs/Form/FormFilePicker";
import Avatar from "../../atoms/Avatar";
import Button from "../../atoms/Buttons/Button";
import cls from "./AddAndEditSalesForm.module.scss";

const AddAndEditSalesForm = ({
    onClose,
    isOpen = false,
    type = 'add'
}) => {
    const salesManagerOptions = [{ value: '1', label: <div className={cls.salesManagerOptions}><Avatar /> <p>Jo'rabek Suyunov</p></div> }]

    return (
        <Dialog isOpen={isOpen} onClose={onClose}>
            <form className={cls.form}>
                <h2 className={cls.form__heading}>Guruh {type === "add" ? "Yaratish" : "Tahrirlash"}</h2>
                <FormInput
                    label='Guruh nomini kiriting'
                    placeholder='Guruh nomini kiriting'
                />
                <FormFilePicker
                    label='Guruh logosi'
                    placeholder='Tanlang'
                    accept={MEDIA_PHOTO_TYPES}
                />
                {type === 'add' && <FormSelect
                    label="Guruh sardorini tanlang"
                    placeholder="Guruh sardorini tanlang"
                    options={salesManagerOptions}
                    isclearable
                    isSearchable
                />}
                <FormInput
                    label='Plan tahrirlash'
                    placeholder='100 000 000'
                    type="number"
                    className={cls.form__input}
                    preffix={'so‘m'}
                />
                <Button>
                    Saqlash
                </Button>
            </form>
        </Dialog>
    )
}

export default AddAndEditSalesForm