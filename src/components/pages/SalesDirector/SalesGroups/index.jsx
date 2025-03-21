import { useNavigate } from 'react-router-dom';
import Table from '@/components/UI/moleculs/Table';
import { PlusIcon } from '@/components/UI/atoms/icons';
import Button from '@/components/UI/atoms/Buttons/Button';
import SalesGroupsSlider from '@/components/templates/SalesGroupsSlider';
import TableActionButton from '@/components/UI/moleculs/TableActionButton';
import EmployeeStatusBadge from '@/components/UI/atoms/EmployeeStatusBadge';
import SalesTeamLeaderCard from '@/components/UI/organisms/SalesTeamLeaderCard';
import cls from './SalesGroups.module.scss';
import Table from '@/components/UI/moleculs/Table';
import EmployeeStatusBadge from '@/components/UI/atoms/EmployeeStatusBadge';
import TableActionButton from '@/components/UI/moleculs/TableActionButton';
import AddAndEditSalesForm from '@/components/UI/organisms/AddAndEditSalesForm';
import { useState } from 'react';

const SalesGroups = () => {
    const navigate = useNavigate()
    const [isOpen, setIsOpen] = useState({isOpen: false, type: 'create'})

    const tableActionButtons = [
        { label: 'Shaxsiy ma’lumotlari', onClick: () => navigate('/sellers/1') },
        { label: 'Transfer qilish', onClick: () => { } },
        { label: 'Parol o’zgartirish', onClick: () => { } },
        { label: 'Plan qo’yish', onClick: () => { } }
    ]

    const columns = [
        { key: "index", title: "№", render: (_, row, index) => index + 1, style: { width: '41px' } },
        { key: "fullName", title: "Ism, familiya", render: (_, row) => `${row.firstName} ${row.lastName}` },
        { key: "birthday", title: "Tug’ilgan kuni", render: (_, row) => row.birthday },
        { key: "status", title: "Status", render: (_, row) => <EmployeeStatusBadge status={row.status} /> },
        { key: "address", title: "Doimiy yashash manzili" },
        { key: "actions", title: "", render: () => <TableActionButton menuItems={tableActionButtons} />, style: { width: "48px" } }
    ]

    const data = [
        { firstName: "Nurbek", lastName: "Abdurahmonov", birthday: "12.12.1780", status: "Ishlayapti", address: "Navoiy viloyati, Xatirchi tumani, Bo’zchi mahallasi" },
        { firstName: "Nurbek", lastName: "Abdurahmonov", birthday: "12.12.1780", status: "Ishlayapti", address: "Navoiy viloyati, Xatirchi tumani, Bo’zchi mahallasi" },
        { firstName: "Nurbek", lastName: "Abdurahmonov", birthday: "12.12.1780", status: "Ishlayapti", address: "Navoiy viloyati, Xatirchi tumani, Bo’zchi mahallasi" },
        { firstName: "Nurbek", lastName: "Abdurahmonov", birthday: "12.12.1780", status: "Ishlayapti", address: "Navoiy viloyati, Xatirchi tumani, Bo’zchi mahallasi" },
        { firstName: "Nurbek", lastName: "Abdurahmonov", birthday: "12.12.1780", status: "Ishlayapti", address: "Navoiy viloyati, Xatirchi tumani, Bo’zchi mahallasi" },
        { firstName: "Nurbek", lastName: "Abdurahmonov", birthday: "12.12.1780", status: "Ishlayapti", address: "Navoiy viloyati, Xatirchi tumani, Bo’zchi mahallasi" },
        { firstName: "Nurbek", lastName: "Abdurahmonov", birthday: "12.12.1780", status: "Ishlayapti", address: "Navoiy viloyati, Xatirchi tumani, Bo’zchi mahallasi" },
        { firstName: "Nurbek", lastName: "Abdurahmonov", birthday: "12.12.1780", status: "Ishlayapti", address: "Navoiy viloyati, Xatirchi tumani, Bo’zchi mahallasi" },
    ]

    return (
        <div className={cls.page}>
            <div className={cls.page__header}>
                <h1 className={cls.page__header__title}>“MILLIARD” jamoasi</h1>
                <div className={cls.page__header__btns}>
                    <Button>Xodim qo’shish <PlusIcon /></Button>
                    <Button onClick={() => setIsOpen({ isOpen: true, type: 'add'})}>Guruh qo’shish <PlusIcon /></Button>
                </div>
            </div>
            <SalesGroupsSlider />
            <SalesTeamLeaderCard />
            <Table columns={columns} data={data} />
            <AddAndEditSalesForm
                onClose={() => setIsOpen({ isOpen: false, type: 'add' })}
                isOpen={isOpen.isOpen}
                type={isOpen.type}
            />
        </div>
    );
}

export default SalesGroups;