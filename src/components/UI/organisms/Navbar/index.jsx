import Avatar from 'react-avatar';
import { useLocation, useNavigate } from 'react-router-dom';
import { USER_ROLES } from '@/constants';
import useGetUser from '@/hooks/useGetUser';
import { getUserFullName } from '@/utils/lib';
import { changeAdaptationStatus } from '@/services/user';
import MentorCards from '../MentorCards';
import Toogle from '../../atoms/Form/Toogle';
import TimePeriodPicker from '../TimePeriodPicker';
import NotificationButton from '../NotificationButton';
import cls from './Navbar.module.scss';

const Navbar = ({ onPerionChange }) => {
    const location = useLocation()
    const navigate = useNavigate()
    const { data: user } = useGetUser()
    const timeperiodPickerPath = ['/', '/main-teachers', '/main-teachers/:id', '/call-teachers', '/call-teachers/:id', '/dashboard', '/statistics/lessons', '/statistics/app-rate']
    const adaptationAllowedRoles = [USER_ROLES.CALL_MENTOR]
    const isMentor = user?.role === USER_ROLES.CALL_MENTOR || user?.role === USER_ROLES.MAIN_MENTOR

    const routeConfig = [
        { path: '/', title: 'Dashboard', roleTitles: { [USER_ROLES.SELLER]: 'Home' }, showBackButton: false },
        { path: '/students', title: 'O’quvchilarim', showBackButton: false },
        { path: '/students/chat/:id', title: 'O’quvchilarim', showBackButton: true },
        { path: '/students/:courseId/:userId', title: 'O’quvchi ma’lumotlari', showBackButton: false },
        { path: '/workspace', title: 'Workspace', showBackButton: false },
        { path: '/user-course/:id', title: 'O’quvchi ma’lumotlari', showBackButton: true },
        { path: '/dictionary', title: 'Lug’at', showBackButton: false },
        { path: '/settings', title: 'Sozlamalar', showBackButton: false },
        { path: '/salary', title: 'Oylik maosh', showBackButton: true },
        // Nazoratchi
        { path: '/all-students', title: 'Barcha o\'quvchilar' },
        { path: '/tasks', title: 'Vazifalarim', showBackButton: false },
        { path: '/adaptation-workspace', title: 'Workspace', showBackButton: false },
        // Sotuv 
        { path: '/dashboard', title: 'Dashboard', rangeTimepicker: { [USER_ROLES.SELLER]: true }, showBackButton: false },
        { path: '/sales-form', title: 'Sotuv formasi', showBackButton: true },
        { path: '/checks', title: 'Checks', showBackButton: true },
        // Asosiy mentor
        { path: '/lessons-schedule', title: 'Dars Jadvali' },
        { path: '/lessons-schedule/:groupId', title: 'Darslar', showBackButton: true },
        { path: '/lessons-schedule/:groupId/:lessonId', title: 'Darslar', showBackButton: true },
        { path: '/lessons-schedule/:groupId/:lessonId/:homeworkId', title: 'Uy ishi', showBackButton: true },
        { path: '/homework/:hometaskId', title: 'Uy ishi', showBackButton: true },
        { path: '/lessons-schedule/:groupId/:lessonId/create-homework', title: 'Uy ishi', showBackButton: true },
        { path: '/platform', title: 'Platforma', showBackButton: false },
        { path: '/materials', title: 'Materials', showBackButton: false },
        // Academic manager
        { path: '/main-teachers', title: 'Asosiy mentorlar', showBackButton: false },
        { path: '/main-teachers/:mentorId/salary', title: 'Oylik maosh', showBackButton: true },
        { path: '/call-teachers', title: 'Nazoratchi mentorlar', showBackButton: false },
        { path: '/call-teachers/:mentorId/salary', title: 'Oylik maosh', showBackButton: true },
        { path: '/users', title: 'Foydalanuvchilar', showBackButton: false },
        { path: '/users/:id', title: 'Foydalanuvchi ma’lumotlari', showBackButton: false },
        { path: '/mentors', title: 'Mentorlar', showBackButton: false },
        { path: '/mentors/create-mentor', title: 'Mentor yaratish', showBackButton: true },
        { path: '/mentors/:mentorId', title: 'Mentor ma’lumotlari', showBackButton: false },
        { path: '/statistics/lessons', title: 'Servis statistikasi', showBackButton: false },
        { path: '/statistics/lessons/:mentorId/:groupId', title: 'Servis statistikasi', showBackButton: false },
        { path: '/statistics/lessons/:mentorId/:groupId/:lessonId', title: 'Servis statistikasi', showBackButton: false },
        { path: '/statistics/app-rate', title: 'Ilova bahosi', showBackButton: false },
        { path: '/courses', title: 'Kurslar', showBackButton: false },
        { path: '/groups', title: 'Guruhlar', showBackButton: false },
        { path: '/groups/:id', title: 'Guruh ma’lumotlari', showBackButton: true },
        { path: '/groups/:id/lesson-schedule', title: 'Jadval', showBackButton: true },
        { path: '/adaptation', title: 'Adaptatsiya', showBackButton: false }
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
                {isMentor && <MentorCards cards={user?.cards} />}
                {adaptationAllowedRoles.includes(user?.role) && (
                    <Toogle
                        defaultChecked={user?.isAdaptationActive}
                        onChange={(e) => changeAdaptationStatus(user?.id, { isAdaptationActive: e.target.checked })}
                    />
                )}
                {timeperiodPickerPath.some(path => matchRoute(path, location.pathname)) && <TimePeriodPicker onChange={onPerionChange} selectsRange={rangeTimepicker} />}
                <NotificationButton />
                <Avatar src={user?.url} name={getUserFullName(user)} size={56} round />
            </div>
        </nav>
    );
}

export default Navbar;
