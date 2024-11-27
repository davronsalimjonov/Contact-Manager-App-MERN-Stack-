import { useCallback, useRef } from "react";

const useRenderItemsHandler = ({
    onTopReach,
    onBottomReach,
    threshold = 10,
    itemCount
}) => {
    const previousScrollIndex = useRef(null);

    const handleRenderItems = useCallback(
        ({ visibleStartIndex, visibleStopIndex, overscanStopIndex }) => {
            const itemsAbove = visibleStartIndex;
            const itemsBelow = itemCount - visibleStopIndex - 1;

            if (itemsAbove <= threshold && previousScrollIndex.current !== "top") {
                onTopReach?.();
                previousScrollIndex.current = "top";
            }

            if (itemsBelow <= threshold && previousScrollIndex.current !== "bottom") {
                onBottomReach?.(overscanStopIndex);
                previousScrollIndex.current = "bottom";
            }

            if (itemsAbove > threshold && itemsBelow > threshold) {
                previousScrollIndex.current = null;
            }
        },
        [onTopReach, onBottomReach, threshold, itemCount]
    );

    return handleRenderItems;
};

export default useRenderItemsHandler;