import { LogoutIcon } from '../../atoms/icons';
import MenuItem from '../MenuItem';
import Dialog from '../../moleculs/Dialog';
import RedButton from '../../atoms/Buttons/RedButton';
import Button from '../../atoms/Buttons/Button';
import useClickOutside from '@/hooks/useClickOutside';
import useAuth from '@/store/auth/auth.thunk';
import cls from './LogoutButton.module.scss'

const LogoutButton = ({
    isOpen = false,
    onClick,
    isModal = false,
    setIsModal,
}) => {
    const ref = useClickOutside({ onClickOutside: () => setIsModal(false) })
    const { logout } = useAuth()

    return (
        <>
            <MenuItem 
                label='Chiqish'
                icon={<LogoutIcon />}
                isOpen={isOpen}
                onClick={onClick}
            />
            <Dialog isOpen={isModal} onClose={() => setIsModal(false)}>
                <div ref={ref} className={cls.sidebar__logOut__Modal}>
                    <div>
                        <p>Siz Akkauntingizda Chiqib Ketmoqchimisiz?</p>
                    </div>
                    <div>
                        <Button className={cls.sidebar__logOut__Modal__Btn} onClick={() => setIsModal(false)}>Yo'q</Button>
                        <RedButton className={cls.sidebar__logOut__Modal__Btn} onClick={logout}>Ha</RedButton>
                    </div>
                </div>
            </Dialog>
        </>
    );
}

export default LogoutButton;