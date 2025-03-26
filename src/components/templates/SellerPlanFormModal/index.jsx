import toast from 'react-hot-toast';
import { useSetSellerPlanMutation } from '@/hooks/useSales';
import PlanFormModal from '@/components/UI/organisms/PlanFormModal';

const SellerPlanFormModal = ({ isOpen, onClose, sellerId }) => {
    const sellerPlanMutation = useSetSellerPlanMutation()

    const handleSubmit = async (data) => {
        await sellerPlanMutation.mutateAsync({ id: sellerId, body: data }, {
            onSuccess: () => {
                toast.success('Plan muvaffaqiyatli oʼzgartirildi')
                onClose()
            },
            onError: (error) => toast.error(error?.response?.data?.message || 'Xatolik yuz berdi')
        })
    }
    return (
        <PlanFormModal
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        />
    );
}

export default SellerPlanFormModal;