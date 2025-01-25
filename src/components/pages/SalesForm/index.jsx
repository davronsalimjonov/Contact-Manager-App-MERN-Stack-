import toast from 'react-hot-toast';
import { useSellerMutations } from '@/hooks/useSeller';
import SaleForm from '@/components/UI/organisms/SaleForm';
import cls from './SalesForm.module.scss';

const SalesForm = () => {
    const { createSellerStudentMutation } = useSellerMutations()

    const handleCreateStudent = async (data) => {
        data.gender = +data.gender

        await createSellerStudentMutation.mutateAsync(data, {
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