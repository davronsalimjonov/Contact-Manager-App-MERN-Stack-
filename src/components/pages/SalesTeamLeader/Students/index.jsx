import { useNavigate } from 'react-router-dom';
import useGetSellerStudents from '@/hooks/useSeller';
import Select from '@/components/UI/atoms/Form/Select';
import { PlusIcon } from '@/components/UI/atoms/icons';
import Button from '@/components/UI/atoms/Buttons/Button';
import StudentsTable from '@/components/templates/StudentsTable';
import cls from './Students.module.scss';
import Loader from '@/components/UI/atoms/Loader';

const Students = () => {
    const navigate = useNavigate()
    const { data: students, isLoading: isLoadingStudents } = useGetSellerStudents()
    
    return (
        <div className={cls.page}>
            <div className={cls.page__header}>
                <Select className={cls.page__header__select} placeholder='Xodimni tanlang' />
                <Button onClick={() => navigate('/sales-form')}>O’quvchi qo’shish <PlusIcon /></Button>
            </div>
            {!isLoadingStudents ? (
                <StudentsTable students={students} menuButtons={false} />
            ) : (
                <Loader />
            )}
        </div>
    );
}

export default Students;