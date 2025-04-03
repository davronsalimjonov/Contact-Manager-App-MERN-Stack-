import { useNavigate } from 'react-router-dom';
import { getUserFullName } from '@/utils/lib';
import Loader from '@/components/UI/atoms/Loader';
import useGetSellerStudents from '@/hooks/useSeller';
import useSessionState from '@/hooks/useSessionState';
import Select from '@/components/UI/atoms/Form/Select';
import { PlusIcon } from '@/components/UI/atoms/icons';
import Button from '@/components/UI/atoms/Buttons/Button';
import StudentsTable from '@/components/templates/StudentsTable';
import StudentsSearchBar from '@/components/UI/organisms/StudentsSearchBar';
import { useGetSellersForSelect, useGetTeamLeaderGroup } from '@/hooks/useSales';
import cls from './Students.module.scss';

const Students = () => {
    const navigate = useNavigate()
    const [filter, setFilter] = useSessionState('teamlead-student-filter', { seller: null })
    const { data: group } = useGetTeamLeaderGroup()
    const { data: sellers } = useGetSellersForSelect({ group: group?.id }, { enabled: !!group?.id })
    const { data: students, isLoading: isLoadingStudents } = useGetSellerStudents(filter?.seller, {status: filter?.status, firstName: filter?.firstName, lastName: filter?.lastName, phone: filter?.phone})
    const sellerOptions = sellers?.map(seller => ({ value: seller?.id, label: getUserFullName(seller) }))

    return (
        <div className={cls.page}>
            <div className={cls.page__header}>
                <Select
                    className={cls.page__header__select} 
                    placeholder='Xodimni tanlang' 
                    options={sellerOptions}
                    defaultValue={sellerOptions?.find(seller => seller?.value === filter?.seller)}
                    isclearable
                    onChange={option => setFilter(state => ({ ...state, seller: option?.value }))}
                />
                <StudentsSearchBar onChange={setFilter} defaultValue={filter} />
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