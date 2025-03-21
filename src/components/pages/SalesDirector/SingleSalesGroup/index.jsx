import { useState } from 'react';
import Tabs from '@/components/UI/moleculs/Tabs';
import Table from '@/components/UI/moleculs/Table';
import cls from './SingleSalesGroup.module.scss';

const columns = [
    { key: "index", title: "№", render: (_, row, index) => index + 1, style: { width: '41px' } },
    { key: "fullName", title: "Ism, familiya", render: (_, row) => `${row.firstName} ${row.lastName}` },
    { key: "plan", title: "Oylik rejasi" },
    { key: "completed", title: "Bajargani", },
    { key: "konversiya", title: "Konversiya" },
    { key: "salary", title: "Oyligi", }
]

const sipTableColumns = [
    { key: 'index', title: '№', render: (_, row, index) => index + 1, style: { width: '41px' } },
    { key: 'fullName', title: 'Ism, familiya', render: (_, row) => `${row.firstName} ${row.lastName}` },
    { key: 'callCount', title: 'Qo\'g\'iroqlar soni' },
    { key: 'success', title: 'Muvaffaqiyatli' },
    { key: 'totalDuration', title: 'Umumiy vaqt' },
]

const data = [
    { firstName: "Nurbek", lastName: "Abdurahmonov", plan: '200 000 000 som', completed: '67 000 000 som', konversiya: '33.5%', salary: '100 000 000 som' }
]

const sipData = [
    { firstName: "Nurbek", lastName: "Abdurahmonov", callCount: 100, success: 67, totalDuration: '30 minut-u 3 sekund' },
    { firstName: "Nurbek", lastName: "Abdurahmonov", callCount: 100, success: 67, totalDuration: '30 minut-u 3 sekund' },
    { firstName: "Nurbek", lastName: "Abdurahmonov", callCount: 100, success: 67, totalDuration: '30 minut-u 3 sekund' },
    { firstName: "Nurbek", lastName: "Abdurahmonov", callCount: 100, success: 67, totalDuration: '30 minut-u 3 sekund' },
    { firstName: "Nurbek", lastName: "Abdurahmonov", callCount: 100, success: 67, totalDuration: '30 minut-u 3 sekund' },
]

const SingleSalesGroup = () => {
    const [tab, setTab] = useState('summ')

    return (
        <div className={cls.page}>
            <h1 className={cls.page__title}>“MILLIARD” jamoasi</h1>
            <Tabs
                options={[
                    { value: 'summ', label: 'Summa bo’yicha' },
                    { value: 'sip', label: 'SIP bo’yicha' }
                ]}
                onChange={setTab}
            />
            {tab === 'summ' && <Table columns={columns} data={data} />}
            {tab === 'sip' && <Table columns={sipTableColumns} data={sipData} />}
        </div>
    );
}

export default SingleSalesGroup;