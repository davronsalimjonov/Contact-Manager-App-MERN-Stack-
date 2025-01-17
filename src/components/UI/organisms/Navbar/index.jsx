import Avatar from 'react-avatar';
import { useLocation, useNavigate } from 'react-router-dom';
import useGetUser from '@/hooks/useGetUser';
import { getUserFullName } from '@/utils/lib';
import TimePeriodPicker from '../TimePeriodPicker';
import NotificationButton from '../NotificationButton';
import cls from './Navbar.module.scss';
import { USER_ROLES } from '@/constants';

const Navbar = ({ onPerionChange }) => {
    const location = useLocation()
    const navigate = useNavigate()
    const { data: user } = useGetUser()
    const timeperiodPickerPath = ['/', '/main-teachers', '/dashboard']

    const routeConfig = [
        { path: '/', title: 'Dashboard', roleTitles: { [USER_ROLES.SELLER]: 'Home' }, showBackButton: false },
        { path: '/students', title: 'O’quvchilarim', showBackButton: false },
        { path: '/students/chat/:id', title: 'O’quvchilarim', showBackButton: true },
        { path: '/dictionary', title: 'Lug’at', showBackButton: false },
        { path: '/Workspace', title: 'Workspace', showBackButton: false },
        { path: '/tasks', title: 'Vazifalarim', showBackButton: false },
        { path: '/settings', title: 'Sozlamalar', showBackButton: true },
        { path: '/sales-form', title: 'Sotuv formasi', showBackButton: true },
    ];

    const matchRoute = (pattern, pathname) => {
        const regex = new RegExp('^' + pattern.replace(/:[^\s/]+/g, '([^/]+)').replace(/\//g, '\\/') + '$');
        return regex.test(pathname);
    };

    const getPageConfig = () => {
        for (const route of routeConfig) {
            const match = matchRoute(route.path, location.pathname);
            if (match) {
                const roleTitle = route.roleTitles?.[user?.role];
                return { ...route, title: roleTitle || route.title };
            }
        }
        return { title: 'Dashboard', showBackButton: false };
    };

    const { title, showBackButton } = getPageConfig();

    return (
        <nav className={cls.navbar}>
            {showBackButton ? (
                <button className={cls.navbar__back} onClick={() => navigate(-1)}>Orqaga</button>
            ) : (
                <span className={cls.navbar__name}>{title}</span>
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