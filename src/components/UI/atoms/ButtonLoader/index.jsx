import { LoaderSpinner } from '../icons';
import cls from './ButtonLoader.module.scss';

const ButtonLoader = ({children}) => {
    return (
        <span className={cls.loader}>
            {children}
            <span className={cls.loader__wrapper}>
                <LoaderSpinner />
            </span>
        </span>
    );
}

export default ButtonLoader;