import dayjs from 'dayjs';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '@/components/UI/organisms/Sidebar';
import Navbar from '@/components/UI/organisms/Navbar';
import cls from './MainLayout.module.scss'

let defaultDate = dayjs().startOf('month').format('YYYY-MM-DD')
let defaultEndDate = dayjs().endOf('month').format('YYYY-MM-DD')

const MainLayout = ({
    sidebarLinks = []
}) => {
    const [period, setPeriod] = useState({ startDate: defaultDate, endDate: defaultEndDate, date: defaultDate, type: 'month' })
    
    return (
        <div className={cls.layout}>
            <Sidebar links={sidebarLinks} />
            <div className={cls.layout__main}>
                <Navbar onPerionChange={setPeriod} />
                <div className={cls.layout__main__body}>
                    <Outlet context={[period]} />
                </div>
            </div>
        </div>
    );
}

export default MainLayout;
