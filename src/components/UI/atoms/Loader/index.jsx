import { cn } from '@/utils/lib';
import cls from './Loader.module.scss';

const Loader = ({ size, className }) => {
    return (
        <div className={cn(cls.loader, className)}>
            <div style={{ width: size }}></div>
        </div>
    );
}

export default Loader;