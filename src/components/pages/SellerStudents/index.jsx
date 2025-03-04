import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useGetSellerStudents from '@/hooks/useSeller';
import { PlusIcon } from '@/components/UI/atoms/icons';
import Button from '@/components/UI/atoms/Buttons/Button';
import StudentsTable from '@/components/templates/StudentsTable';
import StudentsSearchBar from '@/components/UI/organisms/StudentsSearchBar';
import cls from './SellerStudents.module.scss';

const SellerStudents = () => {
    const navigate = useNavigate() 
    const [filter, setFilter] = useState({})
    const { data: students, isLoading: isLoadingStudents } = useGetSellerStudents(filter)

    return (
        <div className={cls.page}>
            <div className={cls.page__header}>
                <StudentsSearchBar
                    onChangeStatus={(status) => setFilter(state => ({ ...state, status: status?.value }))}
                    onChangeFirstName={e => setFilter(state => ({ ...state, firstName: e.target.value?.trim() }))}
                    onChangeLastName={e => setFilter(state => ({ ...state, lastName: e.target.value?.trim() }))}
                    onChangePhone={phone => setFilter(state => ({ ...state, phone }))}
                />
                <Button onClick={() => navigate('/sales-form')}>O’quvchi qo’shish <PlusIcon /> </Button>
            </div>
            <StudentsTable
                students={students}
                isLoading={isLoadingStudents}
                menuButtons={false}
            />
        </div>
    );
}

export default SellerStudents;