import { EMPLOYEE_STATUS_ENUMS } from '@/constants'
import { GENDER_OPTIONS } from '@/constants/form'
import { qualityControlEmployeeSettingsSchema } from '@/schemas/quality'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useNavigate } from 'react-router-dom'
import EmployeeStatusBadge from '../../atoms/EmployeeStatusBadge'
import RedButton from '../../atoms/Buttons/RedButton'
import AvatarUpload from '../../moleculs/AvatarUpload'
import FormDatepicker from '../../moleculs/Form/FormDatepicker'
import FormInput from '../../moleculs/Form/FormInput'
import FormPhoneInput from '../../moleculs/Form/FormPhoneInput'
import FormRadioGroup from '../../moleculs/Form/FormRadioGroup'
import FormSelect from '../../moleculs/Form/FormSelect'
import cls from './EmployeeSettingsForm.module.scss'
import Button from '../../atoms/Buttons/Button'
import { useEffect } from 'react'

const QualityControlEmployeeSettingsForm = ({
    onSubmit,
    defaultValues,
}) => {
    const { register, control, reset, watch, handleSubmit, setValue, formState: { isDirty, errors, isSubmitting, isSubmitSuccessful } } = useForm({
        defaultValues,
        mode: 'onSubmit',
        resolver: yupResolver(qualityControlEmployeeSettingsSchema)
    })
    const statusOptions = EMPLOYEE_STATUS_ENUMS.map((status) => ({ value: status, label: <EmployeeStatusBadge className={cls.statusBadge} status={status} /> }))
    const avatar = watch('avatar')
    const navigate = useNavigate()

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset(defaultValues)
        }
    }, [isSubmitSuccessful])

    return (
        <form className={cls.form} onSubmit={handleSubmit(onSubmit)}>
            <div className={cls.form__avatar}>
                <AvatarUpload
                    value={avatar instanceof File ? URL.createObjectURL(avatar) : avatar}
                    onChange={(image) => setValue('avatar', image, { shouldDirty: true, shouldValidate: true })}
                    onDelete={() => setValue('avatar', null, { shouldDirty: true, shouldValidate: true })}
                />
            </div>
            <div className={cls.form__inputs}>
                <FormInput
                    label="Ismi"
                    placeholder='Ismi'
                    register={{ ...register('firstName') }}
                    error={errors?.firstName?.message}
                />
                <FormInput
                    label="Familyasi"
                    placeholder='Familyasi'
                    register={{ ...register('lastName') }}
                    error={errors?.lastName?.message}
                />
                <FormPhoneInput
                    placeholder='Telefon nomer'
                    label="Telefon nomer"
                    name="phone"
                    control={control}
                    error={errors?.phone?.message}
                />
                <FormDatepicker
                    label="Tug’ilgan sanasi"
                    placeholder='Tug’ilgan sanasi'
                    control={control}
                    name="birthday"
                    error={errors?.birthday?.message}
                />
                <FormRadioGroup
                    label="Jinsi"
                    name="gender"
                    options={GENDER_OPTIONS}
                    register={{ ...register('gender') }}
                    error={errors?.gender?.message}
                />
                <FormSelect
                    label='Status'
                    name='status'
                    control={control}
                    error={errors?.status?.message}
                    options={statusOptions}
                />
            </div>
            <div className={cls.form__btns}>
                <Button
                    type="submit"
                    disabled={!isDirty}
                    isLoading={isSubmitting}>
                    Taxrirlash
                </Button>
                <RedButton
                    onClick={() => {
                        navigate(-1)
                        reset(defaultValues)
                    }}
                >
                    Bekor qilish
                </RedButton>
            </div>
        </form>
    )
}

export default QualityControlEmployeeSettingsForm