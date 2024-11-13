import { useEffect } from "react";
import { useInfiniteQuery } from "react-query";
import { useInView } from "react-intersection-observer";

const useScrollPagination = (queryKey, queryFn, params) => {
    const { ref, inView } = useInView()
    const { data, hasNextPage, fetchNextPage, isFetching, ...other } = useInfiniteQuery(queryKey, queryFn, {
        getNextPageParam: (lastPage) => {
            return lastPage?.meta?.currentPage + 1 <= lastPage?.meta?.totalPages ? lastPage?.meta?.currentPage + 1 : undefined
        },
        ...params
    })

    const items = data?.pages?.length > 0 ? data?.pages?.reduce((acc, page) => [...acc, ...(page?.items || [])], []) : []

    useEffect(() => {
        if (inView && hasNextPage && !isFetching) {
            fetchNextPage()
        }
    }, [inView, isFetching, hasNextPage, fetchNextPage])

    return {
        ...other,
        hasNextPage,
        fetchNextPage,
        isFetching,
        data: items,
        isLoading: isFetching,
        totalItems: data?.pages?.[0]?.meta?.totalItems || 0,
        ref,
    }
}

export default useScrollPagination;