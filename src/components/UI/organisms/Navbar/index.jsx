import Avatar from 'react-avatar';
import { useLocation } from 'react-router-dom';
import useGetUser from '@/hooks/useGetUser';
import { getUserFullName } from '@/utils/lib';
import TimePeriodPicker from '../TimePeriodPicker';
import NotificationButton from '../../moleculs/NotificationButton';
import cls from './Navbar.module.scss';

const Navbar = ({ onPerionChange }) => {
    const location = useLocation()
    const { data: user } = useGetUser()
    const timeperiodPickerPath = ['/', '/main-teachers']
    return (
        <nav className={cls.navbar}>
            <span className={cls.navbar__name}>Dashboard</span>
            <div className={cls.navbar__controls}>
                {timeperiodPickerPath.includes(location.pathname) && <TimePeriodPicker onChange={onPerionChange} />}
                <NotificationButton />
                <Avatar src={user?.url} name={getUserFullName(user)} size={56} round />
            </div>
        </nav>
    );
}

export default Navbar;