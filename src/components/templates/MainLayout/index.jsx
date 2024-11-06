import { Outlet } from 'react-router-dom';
import cls from './MainLayout.module.scss'
import Sidebar from '@/components/UI/organisms/Sidebar';
import Navbar from '@/components/UI/organisms/Navbar';

const MainLayout = () => {
    return (
        <div className={cls.layout}>
            <Sidebar />
            <div className={cls.layout__main}>
                <Navbar />
                <Outlet />
            </div>
        </div>
    );
}

export default MainLayout;
