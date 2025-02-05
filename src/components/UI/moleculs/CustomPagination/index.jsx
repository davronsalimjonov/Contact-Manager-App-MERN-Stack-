import ReactPaginate from 'react-paginate';
import { LeftArrowIcon, RightArrowIcon } from '../../atoms/icons';

const Pagination = ({
    initialPage = 0,
    pageCount = 0,
    onPageChange,
    page
}) => {
    return (
        <div>
            <ReactPaginate
                initialPage={initialPage}
                forcePage={page}
                pageCount={pageCount}
                onPageChange={onPageChange}
                previousLabel={<LeftArrowIcon />}
                nextLabel={<RightArrowIcon />}
                breakLabel={'...'}
                containerClassName="pagination"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item previous"
                nextClassName="page-item next"
                activeClassName="active"
                disabledClassName="disabled"
            />
        </div>
    );
}

export default Pagination;