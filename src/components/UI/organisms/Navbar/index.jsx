import Avatar from 'react-avatar';
import cls from './Navbar.module.scss';
import NotificationButton from '../../moleculs/NotificationButton';
import useGetUser from '@/hooks/useGetUser';
import { getUserFullName } from '@/utils/lib';

const Navbar = () => {
    const { data: user } = useGetUser()

    return (
        <nav className={cls.navbar}>
            <span className={cls.navbar__name}>Dashboard</span>
            <div className={cls.navbar__controls}>

                <NotificationButton />
                <Avatar src={user?.url} name={getUserFullName(user)} size={56} round />
            </div>
        </nav>
    );
}

export default Navbar;