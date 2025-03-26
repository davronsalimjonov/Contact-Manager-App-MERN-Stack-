import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { GENDER_OPTIONS } from '@/constants/form';
import { useGetSalesGroups } from '@/hooks/useSales';
import { yupResolver } from '@hookform/resolvers/yup';
import { createSellerSchema } from '@/schemas/employee';
import { useCreateSellerMutation } from '@/hooks/useEmployee';
import Dialog from '../../moleculs/Dialog';
import { CloseIcon } from '../../atoms/icons';
import Button from '../../atoms/Buttons/Button';
import FormInput from '../../moleculs/Form/FormInput';
import FormSelect from '../../moleculs/Form/FormSelect';
import FormMaskInput from '../../moleculs/Form/FormMaskInput';
import FormDatepicker from '../../moleculs/Form/FormDatepicker';
import FormPhoneInput from '../../moleculs/Form/FormPhoneInput';
import FormRadioGroup from '../../moleculs/Form/FormRadioGroup';
import FormPassportInput from '../../moleculs/Form/FormPassportInput';
import cls from './CreateSellerFormModal.module.scss';
import { useEffect } from 'react';

const CreateSellerFormModal = ({ groupId, isOpen, onClose }) => {
    const { data: groups } = useGetSalesGroups()
    const createSellerMutation = useCreateSellerMutation()
    const { register, control, handleSubmit, reset, setValue, formState: { errors, isDirty, isSubmitting } } = useForm({ mode: 'onSubmit', resolver: yupResolver(createSellerSchema) })

    const groupOptions = groups?.map(group => ({ label: group.title, value: group.id }))

    const handleSubmitForm = async (data) => {
        await createSellerMutation.mutateAsync(data, {
            onSuccess: () => {
                toast.success('Xodim qo’shildi')
                reset()
                onClose?.()
            },
            onError: (error) => toast.error(error?.response?.data?.message || 'Xatolik yuz berdi')
        })
    }

    useEffect(() => {
        if (groupId) setValue('salesGroup', groupId, { shouldDirty: true, shouldValidate: true })
    }, [groupId])

    return (
        <Dialog isOpen={isOpen} onClose={onClose}>
            <form className={cls.form} onSubmit={handleSubmit(handleSubmitForm)}>
                <div className={cls.form__header}>
                    <h2 className={cls.form__header__title}>Xodim qo’shish</h2>
                    <button type='button' onClick={onClose}><CloseIcon /></button>
                </div>
                {!groupId && <FormSelect
                    label='Guruh'
                    placeholder='Tanlang'
                    options={groupOptions}
                    name='salesGroup'
                    control={control}
                    error={errors?.salesGroup?.message}
                />}
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
                <FormDatepicker
                    label='Tug’ilgan kuni'
                    placeholder='dd.mm.yyyy'
                    name='birthday'
                    control={control}
                    error={errors?.birthday?.message}
                />
                <FormPhoneInput
                    label='Telefon raqami'
                    placeholder='Telefon raqami'
                    name='phone'
                    control={control}
                    error={errors?.phone?.message}
                />
                <FormRadioGroup
                    label='Jins'
                    options={GENDER_OPTIONS}
                    register={register('gender')}
                    error={errors?.gender?.message}
                />
                <FormPassportInput
                    label='Passport seriyasi'
                    placeholder='Seriya'
                    name="passport"
                    control={control}
                    error={errors?.passport?.message}
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
                    label='Doimiy yashash manzili'
                    placeholder='Manzilni kiriting'
                    register={register('address')}
                    error={errors?.address?.message}
                />
                <Button
                    type='submit'
                    disabled={!isDirty}
                    isLoading={isSubmitting}
                >
                    Qo’shish
                </Button>
            </form>
        </Dialog>
    );
}

export default CreateSellerFormModal;