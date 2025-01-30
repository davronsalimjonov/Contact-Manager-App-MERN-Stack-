import Avatar from 'react-avatar';
import { useLocation, useNavigate } from 'react-router-dom';
import { USER_ROLES } from '@/constants';
import useGetUser from '@/hooks/useGetUser';
import { getUserFullName } from '@/utils/lib';
import { changeAdaptationStatus } from '@/services/user';
import Toogle from '../../atoms/Form/Toogle';
import TimePeriodPicker from '../TimePeriodPicker';
import NotificationButton from '../NotificationButton';
import cls from './Navbar.module.scss';

const Navbar = ({ onPerionChange }) => {
    const location = useLocation()
    const navigate = useNavigate()
    const { data: user } = useGetUser()
    const timeperiodPickerPath = ['/', '/main-teachers', '/dashboard']
    const adaptationAllowedRoles = [USER_ROLES.CALL_MENTOR, USER_ROLES.MAIN_MENTROR]

    const routeConfig = [
        { path: '/', title: 'Dashboard', roleTitles: { [USER_ROLES.SELLER]: 'Home' }, showBackButton: false },
        { path: '/students', title: 'O’quvchilarim', showBackButton: false },
        { path: '/students/chat/:id', title: 'O’quvchilarim', showBackButton: true },
        { path: '/dictionary', title: 'Lug’at', showBackButton: false },
        { path: '/workspace', title: 'Workspace', showBackButton: false },
        { path: '/adaptation-workspace', title: 'Workspace', showBackButton: false },
        { path: '/tasks', title: 'Vazifalarim', showBackButton: false },
        { path: '/settings', title: 'Sozlamalar', showBackButton: true },
        { path: '/sales-form', title: 'Sotuv formasi', showBackButton: true },
        { path: '/lessons-schedule', title: 'Dars Jadvali' },
        { path: '/courses-iframe', title: 'Kurslar' },
        { path: '/materials', title: 'Materials', showBackButton: false },
        { path: '/dashboard', title: 'Dashboard', rangeTimepicker: { [USER_ROLES.SELLER]: true }, showBackButton: false },
        { path: '/checks', title: 'Checks', showBackButton: true },
        { path: '/groups', title: 'Guruhlar', showBackButton: false }
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
                const rangeTimepicker = route.rangeTimepicker?.[user?.role];
                return { ...route, title: roleTitle || route.title, rangeTimepicker };
            }
        }
        return { title: 'Dashboard', showBackButton: false };
    };

    const { title, showBackButton, rangeTimepicker } = getPageConfig();

    return (
        <nav className={cls.navbar}>
            {showBackButton ? (
                <button className={cls.navbar__back} onClick={() => navigate(-1)}>Orqaga</button>
            ) : (
                <span className={cls.navbar__name}>{title}</span>
            )}
            <div className={cls.navbar__controls}>
                {adaptationAllowedRoles.includes(user?.role) && (
                    <Toogle
                        defaultChecked={user?.isAdaptationActive}
                        onChange={(e) => changeAdaptationStatus(user?.id, { isAdaptationActive: e.target.checked })}
                    />
                )}
                {timeperiodPickerPath.includes(location.pathname) && <TimePeriodPicker onChange={onPerionChange} selectsRange={rangeTimepicker} />}
                <NotificationButton />
                <Avatar src={user?.url} name={getUserFullName(user)} size={56} round />
            </div>
        </nav>
    );
}

export default Navbar;
