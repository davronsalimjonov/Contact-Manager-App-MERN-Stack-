import ModerationTable from "@/components/templates/ModerationTable";
import { Pagination } from "antd";
import { useState } from "react";
import useGetAcceptedRate from "@/hooks/useGetCourseAcceptedRate";

const ModerationNotAcceptedRate = ({ courseId }) => {
    const [filter, setFilter] = useState({
        page: 1,
        limit: 10,
    }
    );

    // TODO

     const { data: comments, isLoading: isLoadingComments } = useGetAcceptedRate(courseId); 
    console.log(comments);

    const onShowSizeChange = (current, pageSize) => {
        setFilter((prev) => {
            return {
                ...prev,
                page: current,
                limit: pageSize,
            }
        })
    };

    return (<></>)
    

            {/* <ModerationTable isLoading={isLoadingComments} comments={comments} />
            {
                (comments?.meta?.totalItems > 0) && <div className={cls.pagination}>
                    <Pagination
                        showSizeChanger
                        onShowSizeChange={onShowSizeChange}
                        defaultCurrent={filter.page}
                        defaultPageSize={filter.limit}
                        showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} comments`}
                        onChange={(page) => {
                            setFilter((prev) => {
                                return {
                                    ...prev,
                                    page: page,
                                }
                            })
                        }}
                        total={comments?.meta?.totalItems}
                    />
                </div>
            }

        </>
    ) */}
}

export default ModerationNotAcceptedRate;