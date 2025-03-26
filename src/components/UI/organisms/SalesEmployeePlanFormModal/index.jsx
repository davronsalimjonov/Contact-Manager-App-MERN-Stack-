import React from 'react'
import Dialog from '../../moleculs/Dialog'
import FormInput from '../../moleculs/Form/FormInput'
import { formatPrice } from '@/utils/lib'
import cls from './SalesEmployeeFormModal.module.scss'
import Button from '../../atoms/Buttons/Button'
import { useUpdateEmployeePlanMutation } from '@/hooks/useSales'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

const SalesEmployeePlanFormModal = ({
    isOpen,
    onClose,
    id = ""
}) => {
    const updateEmployeePlanMutation = useUpdateEmployeePlanMutation()
    const { register, handleSubmit, reset, formState: { errors, isDirty } } = useForm()

    const handleSubmitForm = async (data) => {
        const cleanedData = {
            ...data,
            plan: Number(String(data.plan).replace(/\s+/g, '')) || 0,
        };
        
        await updateEmployeePlanMutation.mutateAsync({ id: id, body: cleanedData }, {
            
            onSuccess: () => {
                toast.success('Plan saqlandi')
                onClose?.()
                reset()
            },
            onError: (error) => toast.error(error?.response?.data?.message || 'Xatolik yuz berdi')    
        })
    }

    return (
        <Dialog isOpen={isOpen} onClose={onClose}>
            <form className={cls.form} onSubmit={handleSubmit(handleSubmitForm)}>
                <h2>Plan Qo'yish</h2>
                <FormInput
                    label='Plan qo‘yish'
                    placeholder='Summa kiriting'
                    className={cls.form__input}
                    register={register('plan', {
                        required: "Planni kiriting",
                        onChange: (e) => {
                            const rawValue = e.target.value.replace(/\s+/g, ''); 
                            e.target.value = formatPrice(rawValue); 
                        }
                    })}
                    error={errors?.plan?.message}
                />
                <Button type='submit' disabled={!isDirty} className={cls.form__submit}>Saqlash</Button>
            </form>
        </Dialog>
    )
}

export default SalesEmployeePlanFormModal