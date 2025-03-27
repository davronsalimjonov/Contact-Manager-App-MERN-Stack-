import { useNavigate } from 'react-router-dom';
import Loader from '@/components/UI/atoms/Loader';
import useGetSellerStudents from '@/hooks/useSeller';
import useSessionState from '@/hooks/useSessionState';
import { PlusIcon } from '@/components/UI/atoms/icons';
import Button from '@/components/UI/atoms/Buttons/Button';
import StudentsTable from '@/components/templates/StudentsTable';
import StudentsSearchBar from '@/components/UI/organisms/StudentsSearchBar';
import cls from './SellerStudents.module.scss';

const SellerStudents = () => {
    const navigate = useNavigate() 
    const [filter, setFilter] = useSessionState('seller-students-filter', {})
    const { data: students, isLoading: isLoadingStudents } = useGetSellerStudents(null, filter)

    return (
        <div className={cls.page}>
            <div className={cls.page__header}>
                <StudentsSearchBar
                   onChange={setFilter}
                   defaultValue={filter}
                />
                <Button onClick={() => navigate('/sales-form')}>O’quvchi qo’shish <PlusIcon /> </Button>
            </div>
            {isLoadingStudents ? (
                <Loader />
            ) : (
                <StudentsTable
                    students={students}
                    menuButtons={false}
                />
            )}
        </div>
    );
}

export default SellerStudents;