import { useState } from 'react';
import toast from 'react-hot-toast';
import { getUserFullName } from '@/utils/lib';
import { useChangeGroupLeaderMutation, useGetSellersForSelect } from '@/hooks/useSales';
import Dialog from '../../moleculs/Dialog';
import { CloseIcon } from '../../atoms/icons';
import Button from '../../atoms/Buttons/Button';
import FormSelect from '../../moleculs/Form/FormSelect';
import cls from './ChangeSalesLeaderFormModal.module.scss';

const ChangeSalesLeaderFormModal = ({ isOpen, onClose, groupId }) => {
    const { data: sellers } = useGetSellersForSelect()
    const [selectedSeller, setSelectedSeller] = useState(null)
    const [isLoadingSubmit, setIsLoadingSubmit] = useState(false)
    const changeLeaderMutation = useChangeGroupLeaderMutation()

    const sellerOptions = sellers?.map(seller => ({ label: getUserFullName(seller), value: seller.id }))

    const handleChangeLeader = (e) => {
        e.preventDefault()
        setIsLoadingSubmit(true)
        changeLeaderMutation.mutate({ id: groupId, body: { teamLead: selectedSeller } }, {
            onSuccess: () => {
                toast.success('Guruh lideri o’zgartirildi')
                onClose()
            },
            onError: (error) => toast.error(error?.response?.data?.message || 'Xatolik yuz berди'),
            onSettled: () => setIsLoadingSubmit(false)
        })
    }

    return (
        <Dialog isOpen={isOpen} onClose={onClose}>
            <form className={cls.form} onSubmit={handleChangeLeader}>
                <div className={cls.form__header}>
                    <h2 className={cls.form__header__title}>Guruh liderini o’zgartirish</h2>
                    <button type='button' onClick={onClose}><CloseIcon /></button>
                </div>
                <FormSelect
                    label='Xodimni tanlang'
                    placeholder='tanlang'
                    options={sellerOptions}
                    onChange={option => setSelectedSeller(option?.value)}
                    isSearchable
                />
                <div className={cls.form__footer}>
                    <Button type='button' onClick={onClose} className={cls.cancel}>Bekor qilish</Button>
                    <Button type='submit' disabled={!selectedSeller} isLoading={isLoadingSubmit}>O’zgartirish</Button>
                </div>
            </form>
        </Dialog>
    );
}

export default ChangeSalesLeaderFormModal;