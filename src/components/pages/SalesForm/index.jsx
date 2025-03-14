import toast from 'react-hot-toast';
import { useSellerMutations } from '@/hooks/useSeller';
import SaleForm from '@/components/UI/organisms/SaleForm';
import cls from './SalesForm.module.scss';
import { objectToFormData } from '@/utils/lib';

const SalesForm = () => {
    const { createSellerStudentMutation } = useSellerMutations()

    const handleCreateStudent = async (data) => {
        data.gender = +data.gender
        data.paymentAmount = +data.paymentAmount.replace(/\D/g, '')
        const fd = objectToFormData(data)

        await createSellerStudentMutation.mutateAsync(fd, {
            onSuccess: () => toast.success('Malumotlar saqlandi'),
            onError: (res) => toast.error(res?.response?.data?.message || 'Xatolik yuz berdi')
        })
    }

    return (
        <div className={cls.page}>
            <SaleForm onSubmit={handleCreateStudent} />
        </div>
    );
}

export default SalesForm;