import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '@/components/UI/organisms/Sidebar';
import Navbar from '@/components/UI/organisms/Navbar';
import cls from './MainLayout.module.scss'

let defaultDate = new Date(Date.now())
defaultDate.setHours(0,0,0,0)
defaultDate = new Date(defaultDate.getTime() + 5 * 60 * 60000).toISOString()

let defaultEndDate = new Date(Date.now())
defaultEndDate.setHours(23, 59, 59, 0)
defaultEndDate = new Date(defaultEndDate.getTime() + 5 * 60 * 60000).toISOString()

const MainLayout = () => {
    const [period, setPeriod] = useState({ startDate: defaultDate, endDate: defaultEndDate, date: defaultDate })
    
    return (
        <div className={cls.layout}>
            <Sidebar />
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
