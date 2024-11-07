import Tabs from '@/components/UI/moleculs/Tabs';
import cls from './MyStudents.module.scss';
import Select from '@/components/UI/atoms/Form/Select';
import DatePicker from '@/components/UI/atoms/Form/DatePicker';
import Button from '@/components/UI/atoms/Buttons/Button';

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
        <>
        <Tabs options={tabOptions} />
        <Select />
        <DatePicker />
        <Button>Guruh qo’shish</Button>
        </>
    );
}

export default MyStudents;