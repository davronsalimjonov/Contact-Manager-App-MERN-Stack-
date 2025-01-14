import { useState } from 'react';
import useGetSellerStudents from '@/hooks/useSellerStudents';
import StudentsTable from '@/components/templates/StudentsTable';
import StudentsSearchBar from '@/components/UI/organisms/StudentsSearchBar';
import cls from './SellerStudents.module.scss';
import { useOutletContext } from 'react-router-dom';

const SellerStudents = () => {
    const [period] = useOutletContext()
    const [filter, setFilter] = useState({})
    const { data: students, isLoading: isLoadingStudents } = useGetSellerStudents(filter)

    return (
        <div className={cls.page}>
            <StudentsSearchBar
                onChangeStatus={(status) => setFilter(state => ({ ...state, status: status?.value }))}
                onChangeFirstName={e => setFilter(state => ({ ...state, firstName: e.target.value?.trim() }))}
                onChangeLastName={e => setFilter(state => ({ ...state, lastName: e.target.value?.trim() }))}
                onChangePhone={phone => setFilter(state => ({ ...state, phone }))}
            />
            <StudentsTable
                students={students}
                isLoading={isLoadingStudents}
            />
        </div>
    );
}

export default SellerStudents;