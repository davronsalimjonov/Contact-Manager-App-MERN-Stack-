import { useState } from 'react';
import toast from 'react-hot-toast';
import { useGetSalesGroups, useTransferSellerMutation } from '@/hooks/useSales';
import Dialog from '../../moleculs/Dialog';
import Button from '../../atoms/Buttons/Button';
import CancelButton from '../../atoms/Buttons/CancelButton';
import SalesGroupSelectCard from '../../moleculs/SalesGroupSelectCard';
import cls from './TransferSellerModal.module.scss';

const TransferSellerModal = ({ isOpen, onClose, employeeId }) => {
    const { data: groups } = useGetSalesGroups()
    const transferMutation = useTransferSellerMutation()
    const [selectedGroup, setSelectedGroup] = useState(null)
    const [isLoadingSubmit, setIsLoadingSubmit] = useState(false)

    const handleClose = () => {
        onClose?.()
        setSelectedGroup(null)
    }

    const handleTransfer = () => {
        setIsLoadingSubmit(true)
        transferMutation.mutateAsync({ id: employeeId, body: { salesGroup: selectedGroup } }, {
            onSuccess: () => {
                toast.success('Xodim transfer qilindi')
                handleClose()
            },
            onError: (error) => toast.error(error?.response?.data?.message || 'Xatolik yuz berdi'),
            onSettled: () => setIsLoadingSubmit(false)
        })
    }

    return (
        <Dialog isOpen={isOpen} onClose={handleClose}>
            <div className={cls.modal}>
                <h2 className={cls.modal__header__title}>Xodim transfer qilish</h2>
                <div className={cls.modal__cards}>
                    {groups?.map(group => (
                        <SalesGroupSelectCard 
                            key={group.id}
                            isActive={selectedGroup === group.id}
                            name={group.title}
                            logoUrl={group.image?.url}
                            onClick={() => setSelectedGroup(group?.id)}
                        />
                    ))}
                </div>
                <div className={cls.modal__btns}>
                    <CancelButton onClick={handleClose}></CancelButton>
                    <Button 
                        disabled={!selectedGroup} 
                        isLoading={isLoadingSubmit}
                        onClick={handleTransfer}
                    >
                        O’zgartirish
                    </Button>
                </div>
            </div>
        </Dialog>
    );
}

export default TransferSellerModal;