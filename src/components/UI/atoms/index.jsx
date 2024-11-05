import { cn } from '@/utils/lib';
import cls from './Atom.module.scss'
import useClickOutside from '@/hooks/useClickOutside';

const Index = ({
    className = ''
}) => {

    return (
        <div className={cn(cls.page)} >
            
        </div>
    );
}

export default Index;
