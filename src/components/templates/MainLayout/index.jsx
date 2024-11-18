import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '@/components/UI/organisms/Sidebar';
import Navbar from '@/components/UI/organisms/Navbar';
import cls from './MainLayout.module.scss'

const defaultDate = new Date(Date.now()).toISOString()

const MainLayout = () => {
    const [period, setPeriod] = useState({ startDate: defaultDate, endDate: defaultDate, date: defaultDate })
    
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
