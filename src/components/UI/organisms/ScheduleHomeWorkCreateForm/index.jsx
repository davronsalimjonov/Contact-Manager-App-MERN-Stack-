import Button from "../../atoms/Buttons/Button"
import { UploadIcon } from "../../atoms/icons"
import CustomFormFilePicker from "../../moleculs/Form/CustomFormFilePicker"
import FormInput from "../../moleculs/Form/FormInput"
import FormTextArea from "../../moleculs/Form/FormTextArea"
import cls from "./ScheduleHomeWorkCreateForm.module.scss"

const ScheduleHomeWorkCreateForm = () => {
    return (
        <form className={cls.ScheduleHomeWorkCreateForm}>
            <FormInput
                label={`Title`}
                placeholder={'Title Kiriting'}
            />
            <CustomFormFilePicker
                label='Material'
                placeholder={(
                    <div className={cls.ScheduleHomeWorkCreateForm__files__placeholder}>
                        <p>File Kiriting</p>
                        <UploadIcon />
                    </div>
                )}
                accept='image/*, application/pdf, video/*, audio/*, .doc, .docx'
                isMulti={true}
            />
            <FormTextArea
                label={'Description'}
                placeholder={'Description Kiriting'}
            />
            <div className={cls.ScheduleHomeWorkCreateForm__submit}>
                <Button type="submit">Yaratish</Button>
            </div>
        </form>
    )
}

export default ScheduleHomeWorkCreateForm