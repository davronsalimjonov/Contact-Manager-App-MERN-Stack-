import Tabs from '@/components/UI/moleculs/Tabs';
import StudentsSearchBar from '@/components/UI/organisms/StudentsSearchBar';
import cls from './MyStudents.module.scss';
import StudentsTable from '@/components/templates/StudentsTable';

const MyStudents = () => {
    const tabOptions = [
        { value: '', label: 'Barchasi' },
        { value: 'a1', label: 'A1' },
        { value: 'a2', label: 'A2' },
        { value: 'b1', label: 'B1' },
        { value: 'b2', label: 'B2' },
        { value: 'c1', label: 'C1' },
    ]
    return (
        <div className={cls.page}>
            <Tabs options={tabOptions} />
            <StudentsSearchBar />
            <StudentsTable />
        </div>
    );
}

export default MyStudents;