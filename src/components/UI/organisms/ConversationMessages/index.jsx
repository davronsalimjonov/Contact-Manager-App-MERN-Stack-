import { memo, useCallback, useLayoutEffect, useMemo, useRef, useState } from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';
import { VariableSizeList as List } from 'react-window';
import { getUserFullName } from '@/utils/lib';
import useRenderItemsHandler from '@/hooks/useItemsRenderHandler';
import ChatCallMessage from '../../moleculs/ChatCallMessage';
import ChatTextMessage from '../../moleculs/ChatTextMessage';
import ChatCommentMessage from '../../moleculs/ChatCommentMessage';
import cls from './ConversationMessages.module.scss';

const MeasurableItem = memo(({ message, index, onMeasure }) => {
    const ref = useRef(null);

    useLayoutEffect(() => {
        if (ref.current) {
            const height = ref.current.offsetHeight;
            onMeasure(index, height);
        }
    }, [message, index, onMeasure]);
    
    const renderContent = useMemo(() => {
        switch (message?.type) {
            case 'message':
                return (
                    <div ref={ref} className={cls.chat__row}>
                        <ChatTextMessage
                            message={message?.message?.text}
                            fullName={getUserFullName(message?.message?.whoSended === 'mentor' ? message?.message?.mentor : message?.message?.user) + ' ' + message?.index}
                        />
                    </div>
                );
            case 'call':
                return (
                    <div ref={ref} className={cls.chat__row}>
                        <ChatCallMessage
                            recordUrl={message?.call?.audio}
                            recordDuration={message?.call?.duration}
                        />
                    </div>
                );
            case 'comment':
                return (
                    <div ref={ref} className={cls.chat__row}>
                        <ChatCommentMessage
                            text={message?.comment?.text}
                            fullName={getUserFullName(message?.comment?.owner)}
                        />
                    </div>
                );
            default: return null;
        }
    }, [message, index]);

    return renderContent;
}, (prevProps, nextProps) => {
    return (
        prevProps.index === nextProps.index &&
        prevProps.message?.id === nextProps.message?.id &&
        prevProps.message?.type === nextProps.message?.type
    );
})

const ConversationMessages = memo(({
    messages = [],
    onBottomReach,
    onTopReach
}) => {
    const listRef = useRef(null);
    const containerRef = useRef(null);
    const [rowHeights, setRowHeights] = useState({});
    const [wasScrollNearBottom, setWasScrollNearBottom] = useState()
    // const [offset, setOffset] = useState(0)
    const prevScrollOffset = useRef(0)
    const prevMessagesCount = useRef(messages?.length)
    const prevScrollHeight = useRef()
    const handleRenderItems = useRenderItemsHandler({
        onTopReach: () => onTopReach(beforeTopReach),
        onBottomReach: () => {
            setWasScrollNearBottom
            onBottomReach();
        },
        itemCount: messages?.length,
        threshold: 7,
    });

    function beforeTopReach() {
        setWasScrollNearBottom(false)
        const container = listRef.current?._outerRef
        prevScrollHeight.current = container?.scrollHeight
        prevScrollOffset.current = listRef.current?.state?.scrollOffset
    }

    const getItemSize = useCallback((index) => {
        return rowHeights[index] || 60;
    }, [rowHeights]);

    const setRowHeight = useCallback((index, height) => {
        setRowHeights(prev => {
            if (prev[index] !== height) {
                const newHeights = { ...prev, [index]: height };
                requestAnimationFrame(() => {
                    listRef.current?.resetAfterIndex(index);
                });
                return newHeights;
            }
            return prev;
        });
    }, []);

    useLayoutEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        if (wasScrollNearBottom) {
            // container.scrollTop = newScrollHeight;
        } else {
            const newMessagesCount = messages?.length - prevMessagesCount?.current
            const container = listRef.current?._outerRef || {};
            const newMessagesSize = Array(newMessagesCount).fill(null).reduce((acc, _, index) => acc + getItemSize(index), 0)
            container.scrollTop = newMessagesSize + prevScrollOffset.current
        }
        prevMessagesCount.current = messages?.length
    }, [messages]);

    const renderRow = useCallback(({ index, style }) => {
        const message = messages[index];

        return (
            <div style={style}>
                <MeasurableItem
                    index={index}
                    message={message}
                    onMeasure={setRowHeight}
                />
            </div>
        );
    }, [messages, setRowHeight]);

    return (
        <div className={cls.chat}>
            <div ref={containerRef} className={cls.chat__window}>
                <AutoSizer>
                    {({ width, height }) => (
                        <List
                            ref={listRef}
                            height={height}
                            width={width}
                            itemCount={messages?.length}
                            itemSize={getItemSize}
                            onItemsRendered={handleRenderItems}
                            overscanCount={7}
                        >
                            {renderRow}
                        </List>
                    )}
                </AutoSizer>
            </div>
        </div>
    );
});

export default ConversationMessages;