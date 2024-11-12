import { MyTeacherLogo } from '@/components/UI/atoms/icons';
import cls from './AuthLayout.module.scss';

const AuthLayout = ({children}) => {
    return (
        <div className={cls.layout}>
            <MyTeacherLogo className={cls.layout__logo} />
            {children}
        </div>
    );
}

export default AuthLayout;