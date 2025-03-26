import Button from '@/components/UI/atoms/Buttons/Button';
import cls from './Students.module.scss';
import { PlusIcon } from '@/components/UI/atoms/icons';
import Select from '@/components/UI/atoms/Form/Select';
import useGetSellerStudents from '@/hooks/useSeller';

const Students = () => {
    const { data: students, isLoading: isLoadingStudents } = useGetSellerStudents()
    
    return (
        <div className={cls.page}>
            <div className={cls.page__header}>
                <Select className={cls.page__header__select} placeholder='Xodimni tanlang' />
                <Button>O’quvchi qo’shish <PlusIcon /></Button>
            </div>

        </div>
    );
}

export default Students;