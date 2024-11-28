import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';
import { VariableSizeList as List } from 'react-window';
import useRenderItemsHandler from '@/hooks/useItemsRenderHandler';
import { getUserFullName } from '@/utils/lib';
import Loader from '../../atoms/Loader';
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

    const renderContent = () => {
        switch (message?.type) {
            case 'message':
                return (
                    <ChatTextMessage
                        message={message?.message?.text}
                        fullName={getUserFullName(message?.message?.whoSended === 'mentor' ? message?.message?.mentor : message?.message?.user) + ' ' + index}
                    />
                );
            case 'call':
                return (
                    <ChatCallMessage
                        recordUrl={message?.call?.audio}
                        recordDuration={message?.call?.duration}
                    />
                );
            case 'comment':
                return (
                    <ChatCommentMessage
                        text={message?.comment?.text}
                        fullName={getUserFullName(message?.comment?.owner)}
                    />
                );
            default: return null;
        }
    }

    return (
        <div ref={ref} className={cls.chat__row} style={{ paddingTop: index === 0 ? '20px' : '' }}>
            {renderContent()}
        </div>
    );
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
    const prevScrollHeight = useRef(0)
    const handleRenderItems = useRenderItemsHandler({
        onTopReach,
        onBottomReach,
        itemCount: messages?.length,
        threshold: 7,
    });

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
        const addedHeight = Array(50).fill('f').reduce((acc, curr, index) => acc + getItemSize(index),0)

        requestAnimationFrame(() => {
            const newScrollHeight = container.scrollHeight;
            
            if (wasScrollNearBottom) {
                container.scrollTop = newScrollHeight;
            } else {
                listRef.current.scrollTo(addedHeight);
            }

            prevScrollHeight.current = container.scrollTop
        });
    }, [messages]);

    const renderRow = useCallback(({ index, style }) => {
        const message = messages[index];

        return (
            <div style={style} key={message?.id}>
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
                            itemCount={messages.length}
                            itemSize={getItemSize}
                            onItemsRendered={handleRenderItems}
                            overscanCount={10}
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