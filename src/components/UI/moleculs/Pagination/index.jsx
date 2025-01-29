import ReactPaginate from "react-paginate";
import cls from "./Pagination.module.scss";
import { useState, useCallback, useEffect } from "react";

const Pagination = (({
  metaData,
  limit=10,
  setLimit,
  page=1,
  setPage
}) => {
  const [paginationMeta, setPaginationMeta] = useState({
    currentPage: page,
    itemsPerPage: limit,
    itemCount: metaData?.itemCount || 0,
    totalItems: metaData?.totalItems || 0,
    totalPages: metaData?.totalPages || 1,
  });

  const handlePageChange = useCallback((selected) => {
    const newPage = selected.selected + 1;
    setPaginationMeta((prev) => ({...prev, currentPage: newPage }));
    setPage(newPage);
  }, [setPage]);

  const handleItemsPerPageChange = useCallback((e) => {
    const newItemsPerPage = parseInt(e.target.value, 10);
    setPaginationMeta((prev) => ({
    ...prev,
      itemsPerPage: newItemsPerPage,
    }));
    setLimit(newItemsPerPage);
    if (paginationMeta.currentPage > Math.ceil(paginationMeta.itemCount / newItemsPerPage)) {
      setPaginationMeta((prev) => ({...prev, currentPage: Math.ceil(paginationMeta.itemCount / newItemsPerPage) }));
      setPage(Math.ceil(paginationMeta.itemCount / newItemsPerPage));
    }
  }, [setLimit, paginationMeta, setPage]);

  useEffect(()=>{
    setPaginationMeta({
      currentPage: page,
      itemsPerPage: limit,
      itemCount: metaData?.itemCount || 0,
      totalItems: metaData?.totalItems || 0,
      totalPages: metaData?.totalPages || 1,
    })
  }, [metaData, page, limit])

  return (
    <div className={cls.paginationWrapper}>
      <ReactPaginate
        pageCount={paginationMeta.totalPages}
        previousLabel={<div className={cls.arrowContainer}><span>&lt;</span></div>}
        nextLabel={<div className={cls.arrowContainer}><span>&gt;</span></div>}
        breakLabel="..."
        containerClassName={cls.pagination}
        pageClassName={cls.page}
        pageLinkClassName={cls.pageLink}
        previousClassName={cls.previous}
        nextClassName={cls.next}
        activeClassName={cls.active}
        disabledClassName={cls.disabled}
        onPageChange={handlePageChange}
        forcePage={paginationMeta.currentPage - 1}
      />
      <div className={cls.itemsPerPage}>
        <select
          value={paginationMeta.itemsPerPage}
          onChange={handleItemsPerPageChange}
        >
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
        </select>
      </div>
    </div>
  );
});

export default Pagination;