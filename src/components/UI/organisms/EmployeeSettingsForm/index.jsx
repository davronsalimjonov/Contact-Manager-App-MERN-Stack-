import { EMPLOYEE_STATUS_ENUMS } from '@/constants'
import Button from '../../atoms/Buttons/Button'
import RedButton from '../../atoms/Buttons/RedButton'
import AvatarUpload from '../../moleculs/AvatarUpload'
import FormDatepicker from '../../moleculs/Form/FormDatepicker'
import FormInput from '../../moleculs/Form/FormInput'
import FormPhoneInput from '../../moleculs/Form/FormPhoneInput'
import FormRadioGroup from '../../moleculs/Form/FormRadioGroup'
import FormSelect from '../../moleculs/Form/FormSelect'
import EmployeeStatusBadge from '../../atoms/EmployeeStatusBadge'
import cls from './EmployeeSettingsForm.module.scss'
import { GENDER_OPTIONS } from '@/constants/form'

const EmployeeSettingsForm = () => {
    const statusOptions = EMPLOYEE_STATUS_ENUMS.map((status) => ({ value: status, label: <EmployeeStatusBadge className={cls.statusBadge} status={status} />  }))

    return (
        <form className={cls.form}>
            <div className={cls.form__avatar}>
                <AvatarUpload
                // value={avatar instanceof File ? URL.createObjectURL(avatar) : avatar}
                // onChange={(image) => setValue('avatar', image, { shouldDirty: true, shouldValidate: true })}
                // onDelete={() => setValue('avatar', null, { shouldDirty: true, shouldValidate: true })}
                />
            </div>
            <div className={cls.form__inputs}>
                <FormInput
                    label="Ismi"
                    placeholder='Ismi'
                // register={{ ...register('firstName') }}
                // error={errors?.firstName?.message}
                />
                <FormInput
                    label="Familyasi"
                    placeholder='Familyasi'
                // register={{ ...register('lastName') }}
                // error={errors?.lastName?.message}
                />
                <FormPhoneInput
                    placeholder='Telefon nomer'
                    label="Telefon nomer"
                // name="phone"
                // control={control}
                // error={errors?.phone?.message}
                />
                <FormDatepicker
                    label="Tug’ilgan sanasi"
                    placeholder='Tug’ilgan sanasi'
                // control={control}
                // name="birthday"
                // error={errors?.birthday?.message}
                />
                <FormRadioGroup
                    label="Jinsi"
                    name="gender"
                    options={GENDER_OPTIONS}
                // register={{ ...register('gender') }}
                // error={errors?.gender?.message}
                />
                <FormSelect
                    label='Status'
                    defaultValue={statusOptions[0]}
                    options={statusOptions}
                />
            </div>
            <div className={cls.form__btns}>
                <Button
                // type="submit"
                // isLoading={isSubmitting}
                // disabled={!isDirty}
                >
                    Export
                </Button>
                <RedButton
                    // disabled={!isDirty}
                    onClick={() => reset()}
                >
                    Bekor qilish
                </RedButton>
            </div>
        </form>
    )
}

export default EmployeeSettingsForm