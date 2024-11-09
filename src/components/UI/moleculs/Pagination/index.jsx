import ReactPaginate from 'react-paginate';
import cls from './Pagination.module.scss';
import { LeftArrowIcon } from '../../atoms/icons';

const Pagination = () => {
    return (
        <div>
            <ReactPaginate 
                pageCount={10}
                previousLabel={<LeftArrowIcon />}
            />
        </div>
    );
}

export default Pagination;