import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';
import { VariableSizeList as List } from 'react-window';
import useRenderItemsHandler from '@/hooks/useItemsRenderHandler';
import { getUserFullName } from '@/utils/lib';
import ChatCallMessage from '../../moleculs/ChatCallMessage';
import ChatTextMessage from '../../moleculs/ChatTextMessage';
import ChatCommentMessage from '../../moleculs/ChatCommentMessage';
import cls from './ConversationMessages.module.scss';

const MeasurableItem = memo(({ message, index, onMeasure }) => {
    const ref = useRef(null);

    useEffect(() => {
        if (ref.current) {
            const measureTimer = requestAnimationFrame(() => {
                const height = ref.current.getBoundingClientRect().height;
                onMeasure(index, height);
            });

            return () => cancelAnimationFrame(measureTimer);
        }
    }, [index, message, onMeasure]);

    const renderContent = useMemo(() => {
        switch (message?.type) {
            case 'message':
                return (
                    <div ref={ref} key={message?.id} className={cls.chat__row} style={{ paddingTop: index === 0 ? '20px' : '' }}>
                        <ChatTextMessage
                            message={message?.message?.text}
                            fullName={getUserFullName(message?.message?.whoSended === 'mentor' ? message?.message?.mentor : message?.message?.user) + ' ' + message?.index}
                        />
                    </div>
                );
            case 'call':
                return (
                    <div ref={ref} key={message?.id} className={cls.chat__row} style={{ paddingTop: index === 0 ? '20px' : '' }}>
                        <ChatCallMessage
                            recordUrl={message?.call?.audio}
                            recordDuration={message?.call?.duration}
                        />
                    </div>
                );
            case 'comment':
                return (
                    <div ref={ref} key={message?.id} className={cls.chat__row} style={{ paddingTop: index === 0 ? '20px' : '' }}>
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
});

const ConversationMessages = memo(({
    messages = [],
    onBottomReach,
    onTopReach
}) => {
    const listRef = useRef(null);
    const containerRef = useRef(null);
    const [rowHeights, setRowHeights] = useState({});
    const lastIndex = useRef(0)
    const handleRenderItems = useRenderItemsHandler({
        onTopReach: (index) => {
            beforeTopReach(index);
            onTopReach()
        },
        onBottomReach,
        itemCount: messages?.length,
        threshold: 7,
    });

    function beforeTopReach(visibleStartIndex) {
        const container = listRef.current._outerRef
        const scrollHeight = container?.scrollHeight
        
        lastIndex.current = listRef.current?.state?.scrollOffset
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

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const scrollToBottom = container.scrollHeight - container.scrollTop - container.clientHeight;
        const scrollToTop = container.scrollTop;
        const wasScrollNearBottom = scrollToTop < scrollToBottom;

        const newScrollHeight = container.scrollHeight;

        if (wasScrollNearBottom) {
            container.scrollTop = newScrollHeight;
        } else {
            setTimeout(() => {
                const container = listRef.current._outerRef;
                const newMessagesSize = Array(10).fill('d').reduce((acc, _, index) => acc + getItemSize(index), 0)
                container.scrollTop = newMessagesSize + lastIndex.current - 26
            }, 0)
        }
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

    const listProps = useMemo(() => ({
        itemCount: messages.length,
        itemSize: getItemSize,
        onItemsRendered: handleRenderItems,
        overscanCount: 10
    }), [messages.length, getItemSize, handleRenderItems]);

    return (
        <div className={cls.chat}>
            <div ref={containerRef} className={cls.chat__window}>
                <AutoSizer>
                    {({ width, height }) => (
                        <List
                            ref={listRef}
                            height={height}
                            width={width}
                            {...listProps}
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