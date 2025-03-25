import ModerationTable from "@/components/templates/ModerationTable";
import cls from './ModerationAllCourseRate.module.scss';
import useGetCourseRate from "@/hooks/useGetCourseRate";
import { useState } from "react";
import ModerationDialog from "../ModerationDialog";
import Pagination from "../../moleculs/CustomPagination";

const ModerationAllCourseRate = ({ courseId, activeTab }) => {

    const [filter, setFilter] = useState({
        page: 0,
        limit: 10,
    }
    );

    const { data: comments, isLoading: isLoadingComments } = useGetCourseRate(courseId, {
        page: filter.page + 1,
        limit: filter.limit,
        isActive: activeTab
    });

    const [isOpen, setIsOpen] = useState(false);

    const [comment, setComment] = useState({});

    const onClose = () => {
        setIsOpen(false);
    }

    const onOpen = (data) => {
        setComment(data);
        setIsOpen(true);
    }

    return (
        <>
            <ModerationTable
                isLoading={isLoadingComments}
                comments={comments}
                onOpen={onOpen}
                courseId={courseId}
                params={{
                    page: filter.page,
                    limit: filter.limit,
                    isActive: activeTab,
                }} />
            {
                (comments?.meta?.totalItems > filter.limit) && <div className={cls.pagination}>
                    <Pagination
                        initialPage={filter.page}
                        pageCount={comments?.meta?.totalPages}
                        onPageChange={({ selected }) => setFilter({ ...filter, page: selected })}
                        page={filter.page}
                        breakLabel={false}
                        pageRangeDisplayed={3}
                        marginPagesDisplayed={1}
                        className={cls.pagination__style}
                    />
                    <select
                        value={filter?.limit}
                        onChange={(e) => setFilter({ ...filter, limit: e.target.value })}
                    >
                        <option value={filter.limit} disabled>{filter.limit}</option>
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                    </select>
                </div>
            }
            <ModerationDialog comment={comment} isOpen={isOpen} onClose={onClose} courseId={courseId} params={{
                page: filter.page,
                limit: filter.limit,
                isActive: activeTab
            }} />
        </>
    )
}

export default ModerationAllCourseRate;