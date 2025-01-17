import { Outlet } from 'react-router-dom';
import Navbar from '@/components/UI/organisms/Navbar';
import cls from './SinglePageLayout.module.scss';

const SinglePageLayout = () => {
    return (
        <div className={cls.layout}>
            <Navbar goToBack />
            <div className={cls.layout__children}>
                <Outlet />
            </div>
        </div>
    );
}

export default SinglePageLayout;