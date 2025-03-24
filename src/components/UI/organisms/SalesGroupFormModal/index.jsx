import { useEffect } from "react";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useQueryClient } from "react-query";
import { MEDIA_PHOTO_TYPES } from "@/constants";
import { useCreateSalesGroupMutation, useGetSellersForSelect, useUpdateSalesGroupMutation } from "@/hooks/useSales";
import { extractPrice, formatPrice, getUserFullName, objectToFormData } from "@/utils/lib";
import Dialog from "../../moleculs/Dialog";
import Button from "../../atoms/Buttons/Button";
import FormInput from "../../moleculs/Form/FormInput";
import FormSelect from "../../moleculs/Form/FormSelect";
import FormFilePicker from "../../moleculs/Form/FormFilePicker";
import cls from "./SalesGroupFormModal.module.scss";

const SalesGroupFormModal = ({
    isOpen = false,
    isCreate = false,
    groupId,
    onClose,
}) => {
    const queryClient = useQueryClient()
    const createGroupMutation = useCreateSalesGroupMutation()
    const updateGroupMutation = useUpdateSalesGroupMutation()
    const { data: sellers } = useGetSellersForSelect({ enabled: isOpen && isCreate })
    const { register, control, setValue, handleSubmit, reset, watch, formState: { errors, isSubmitting, isDirty } } = useForm();

    const logo = watch('image')
    const salesManagerOptions = sellers?.map(seller => ({ value: seller?.id, label: getUserFullName(seller) }))

    const handleSubmitForm = async (data) => {
        data.plan = extractPrice(data.plan)

        if (isCreate) {
            await createGroupMutation.mutateAsync(objectToFormData(data), {
                onSuccess: () => {
                    toast.success('Guruh yaratildi')
                    onClose?.()
                    reset()
                },
                onError: (error) => toast.error(error?.response?.data?.message || 'Xatolik yuz berdi')
            })
        } else {
            if (!(data?.image instanceof File)) delete data.image
            await updateGroupMutation.mutateAsync({ id: groupId, body: objectToFormData(data) }, {
                onSuccess: () => {
                    toast.success('Malumotlar saqlandi')
                    onClose?.()
                    reset()
                },
                onError: (error) => toast.error(error?.response?.data?.message || 'Xatolik yuz berdi')
            })
        }
    }

    useEffect(() => {
        if (!isCreate && groupId) {
            const group = queryClient.getQueryData(['sales-groups'])?.find(group => group?.id === groupId)
            if (group) reset({
                title: group?.title,
                image: { name: group?.image?.url?.split('/').pop() },
                plan: formatPrice(group?.monthPlans?.plan)
            })
        }
    }, [groupId, isOpen])

    return (
        <Dialog isOpen={isOpen} onClose={onClose}>
            <form className={cls.form} onSubmit={handleSubmit(handleSubmitForm)}>
                <h2 className={cls.form__heading}>Guruh {isCreate ? "Yaratish" : "Tahrirlash"}</h2>
                <FormInput
                    label='Guruh nomini kiriting'
                    placeholder='Guruh nomini kiriting'
                    register={register('title', { required: "Guruh nomini kiriting" })}
                    error={errors?.title?.message}
                />
                <FormFilePicker
                    label='Guruh logosi'
                    placeholder='Tanlang'
                    accept={MEDIA_PHOTO_TYPES}
                    defaultFile={logo}
                    onChange={file => setValue('image', file, { shouldDirty: true, shouldValidate: true })}
                    error={errors?.image?.message}
                />
                {isCreate && <FormSelect
                    label="Guruh sardorini tanlang"
                    placeholder="Guruh sardorini tanlang"
                    isclearable
                    isSearchable
                    options={salesManagerOptions}
                    control={control}
                    name="teamLead"
                    error={errors?.teamLead?.message}
                />}
                <FormInput
                    preffix={'so‘m'}
                    label='Plan tahrirlash'
                    placeholder='Oylik plan'
                    className={cls.form__input}
                    register={register('plan', {
                        required: "Planni kiriting",
                        onChange: e => e.target.value = formatPrice(e.target.value)
                    })}
                    error={errors?.plan?.message}
                />
                <Button
                    type="submit"
                    disabled={!isDirty}
                    isLoading={isSubmitting}
                >
                    Saqlash
                </Button>
            </form>
        </Dialog>
    )
}

export default SalesGroupFormModal