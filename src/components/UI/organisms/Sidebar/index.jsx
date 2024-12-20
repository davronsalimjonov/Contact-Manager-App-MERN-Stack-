import { useState } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/utils/lib';
import usePersistentState from '@/hooks/usePersistentState';
import MenuButton from '../../moleculs/MenuButton';
import SidebarLink from '../../moleculs/SidebarLink';
import LogoutButton from '../../moleculs/LogoutButton';
import LanguageButton from '../../moleculs/LanguageButton';
import { MyTeacherLogo, SettingsIcon } from '../../atoms/icons';
import cls from './Sidebar.module.scss';

const Sidebar = ({
    links = []
}) => {
    const [isOpen, setIsOpen] = usePersistentState('sidebar-state', true)
    const [isModal, setIsModal] = useState(false)

    return (
        <aside className={cn(cls.sidebar, !isOpen && cls.close)}>
            <Link to='/'>
                <MyTeacherLogo className={cn(!isOpen && cls.closeLogo)} />
            </Link>
            <MenuButton
                className={cls.sidebar__menuBtn}
                onClick={() => setIsOpen(state => !state)}
                isOpen={isOpen}
            />
            <div className={cls.sidebar__links}>
                {links.length > 0 && links.map(link => (
                    <SidebarLink
                        key={link.id}
                        label={link.label}
                        icon={link.icon}
                        to={link.link}
                        isOpen={isOpen}
                        children={link?.children}
                    />
                ))}
            </div>
            <div className={cls.sidebar__bottomList}>
                <LanguageButton
                    isOpen={isOpen}
                />
                <SidebarLink
                    to='/settings'
                    label='Sozlamalar'
                    icon={<SettingsIcon />}
                    isOpen={isOpen}
                />
                <LogoutButton
                    isOpen={isOpen}
                    onClick={() => setIsModal(true)}
                    isModal={isModal}
                    setIsModal={setIsModal}
                />
            </div>
        </aside>
    );
}

export default Sidebar;