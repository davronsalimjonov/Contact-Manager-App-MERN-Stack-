import { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/utils/lib';
import { RightArrowIcon } from '../../atoms/icons';
import cls from './BreadCrumb.module.scss';

const BreadCrumb = ({
    className = '',
    items = []
}) => {
    const navigate = useNavigate();

    return (
        <div className={cn(cls.breadcrumb, className)}>
            {items?.length > 0 && items.map((item, index) => (
               <Fragment key={index}>
                   <button onClick={() => navigate(item.url)}>{item.label}</button>
                   {index < items.length - 1 && <span className={cls.breadcrumb__separator}><RightArrowIcon /></span>}
               </Fragment> 
            ))}
        </div>
    );
}

export default BreadCrumb;