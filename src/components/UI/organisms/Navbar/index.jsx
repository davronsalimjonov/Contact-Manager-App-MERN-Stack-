import Avatar from 'react-avatar';
import { useLocation, useNavigate } from 'react-router-dom';
import useGetUser from '@/hooks/useGetUser';
import { getUserFullName } from '@/utils/lib';
import TimePeriodPicker from '../TimePeriodPicker';
import NotificationButton from '../NotificationButton';
import cls from './Navbar.module.scss';

const Navbar = ({ onPerionChange, goToBack }) => {
    const location = useLocation()
    const navigate = useNavigate()
    const { data: user } = useGetUser()
    const timeperiodPickerPath = ['/', '/main-teachers', '/dashboard']
console.log(timeperiodPickerPath.includes(location.pathname));


    return (
        <nav className={cls.navbar}>
            {goToBack ? (
                <button className={cls.navbar__back} onClick={() => navigate(-1)}>Orqaga</button>
            ) : (
                <span className={cls.navbar__name}>Dashboard</span>
            )}
            <div className={cls.navbar__controls}>
                {timeperiodPickerPath.includes(location.pathname) && <TimePeriodPicker onChange={onPerionChange} />}
                <NotificationButton />
                <Avatar src={user?.url} name={getUserFullName(user)} size={56} round />
            </div>
        </nav>
    );
}

export default Navbar;