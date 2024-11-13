import { memo } from "react";
import Loader from "../Loader";

const Mapper = ({
    data = [],
    isLoading = false,
    isInfinityQuery = false,
    renderItem,
    emptyComponentTitle = 'Пусто',
    emptyComponentDescription = '',
}) => {
    if (isLoading && data?.length < 1) {
        return <Loader />
    } else if (data?.length < 1 || typeof renderItem !== 'function') {
        // return <EmptyProduct title={emptyComponentTitle} description={emptyComponentDescription} />
        return
    }

    return (
        <>
            {data?.map(renderItem)}
            {isLoading && isInfinityQuery && <Loader />}
        </>
    )
}

export default memo(Mapper);