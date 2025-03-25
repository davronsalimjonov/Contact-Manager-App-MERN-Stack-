import ReactPaginate from 'react-paginate';
import { LeftArrowIcon, RightArrowIcon } from '../../atoms/icons';
import { cn } from '@/utils/lib';

const Pagination = ({
    initialPage = 0,
    pageCount = 0,
    onPageChange,
    page,
    breakLabel = true,
    pageRangeDisplayed = page,
    marginPagesDisplayed = 1,
    className=""
}) => {
    return (
        <ReactPaginate
            initialPage={initialPage}
            forcePage={page}
            pageCount={pageCount}
            onPageChange={onPageChange}
            previousLabel={<LeftArrowIcon />}
            nextLabel={<RightArrowIcon />}
            breakLabel={breakLabel && '...'}
            containerClassName="pagination"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item previous"
            nextClassName="page-item next"
            activeClassName="active"
            className={cn('pagination', className)}
            disabledClassName="disabled"
            renderOnZeroPageCount={null}
            pageRangeDisplayed={pageRangeDisplayed}
            marginPagesDisplayed={marginPagesDisplayed}
        />
    );
}

export default Pagination;