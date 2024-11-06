import Avatar from 'react-avatar';
import cls from './Navbar.module.scss';
import NotificationButton from '../../moleculs/NotificationButton';

const Navbar = () => {
    return (
        <nav className={cls.navbar}>
            <span className={cls.navbar__name}>Dashboard</span>
            <div className={cls.navbar__controls}>
                
                <NotificationButton />
                <Avatar name='Sardor Aliev' size={56} round />
            </div>
        </nav>
    );
}

export default Navbar;