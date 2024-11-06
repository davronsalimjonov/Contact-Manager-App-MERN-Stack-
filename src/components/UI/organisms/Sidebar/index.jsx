import { Link } from 'react-router-dom';
import { MyTeacherLogo } from '../../atoms/icons';
import cls from './Sidebar.module.scss';
import MenuItem from '../../moleculs/MenuItem';

const Sidebar = () => {
    return (
        <aside className={cls.sidebar}>
            <Link to='/'>
                <MyTeacherLogo />
            </Link>
            <MenuItem />
        </aside>
    );
}

export default Sidebar;