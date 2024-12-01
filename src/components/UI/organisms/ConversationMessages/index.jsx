import { memo, useRef, useState, useEffect } from 'react';
import useDebounce from '@/hooks/useDebounce';
import { getUserFullName } from '@/utils/lib';
import { useVirtualizer } from '@tanstack/react-virtual';
import Loader from '../../atoms/Loader';
import ChatCallMessage from '../../moleculs/ChatCallMessage';
import ChatTextMessage from '../../moleculs/ChatTextMessage';
import ChatCommentMessage from '../../moleculs/ChatCommentMessage';
import cls from './ConversationMessages.module.scss';

const RenderMessage = ({ message }) => {
    switch (message?.type) {
        case 'message':
            return (
                <ChatTextMessage
                    message={message?.message?.text}
                    fullName={getUserFullName(message?.message?.whoSended === 'mentor' ? message?.message?.mentor : message?.message?.user) + ' ' + message?.index}
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

const ConversationMessages = memo(({
    messages = [],
    onBottomReach,
    onTopReach
}) => {
    const THRESHOLD = 7
    const defaultEstimateSize = 85;

    const firstRender = useRef()
    const containerRef = useRef(null);
    const prevScrollHeight = useRef(0);
    const scrollOffset = useRef(0)
    const sizeCache = useRef({});
    const [scrollWasNearTop, setScrollWasNearTop] = useState()
    const [hasMoreItems, setHasMoreItems] = useState({ above: true, bellow: true })
    const [isLoadingMore, setIsLoadingMore] = useState({ top: false, bottom: false });

    const handleScroll = useDebounce(async (instance) => {
        const scrollHeight = instance.getTotalSize()
        prevScrollHeight.current = scrollHeight

        const virtualItems = instance.getVirtualItems()
        const firstVisibleIndex = virtualItems[0]?.index
        const lastVisibleItem = virtualItems[virtualItems.length - 1]
        const remainingItemsCount = messages.length - lastVisibleItem.index

        if (firstVisibleIndex <= THRESHOLD && !isLoadingMore.top && hasMoreItems?.above) {
            setIsLoadingMore(state => ({ ...state, top: true }))
            await onTopReach((messagesLength) => {
                scrollOffset.current = instance.scrollOffset
                setScrollWasNearTop(true)
                if (!messagesLength) setHasMoreItems(state => ({ ...state, above: false }))
            });
            setIsLoadingMore(state => ({ ...state, top: false }))
        } else if (remainingItemsCount <= THRESHOLD && !isLoadingMore.bottom && hasMoreItems?.bellow) {
            setIsLoadingMore(state => ({ ...state, bottom: true }))
            await onBottomReach((messagesLength) => {
                setScrollWasNearTop(false)
                if (!messagesLength) setHasMoreItems(state => ({ ...state, bellow: false }))
            })
            setIsLoadingMore(state => ({ ...state, bottom: false }))
        }
    }, 300)

    const virtualizer = useVirtualizer({
        paddingStart: 20,
        gap: 0,
        count: messages.length,
        getScrollElement: () => containerRef.current,
        estimateSize: (index) => sizeCache.current[index] || defaultEstimateSize,
        measureElement: (el, index) => {
            const height = el.getBoundingClientRect().height;
            sizeCache.current[index] = height;
            return height;
        },
        overscan: 50,
        onChange: handleScroll
    });

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        if (scrollWasNearTop) {
            const newScrollHeight = virtualizer.getTotalSize()
            virtualizer.scrollToOffset((newScrollHeight - prevScrollHeight.current) + scrollOffset.current)
        }

    }, [messages?.length]);

    useEffect(() => {
        let firstUnreadedIndex = messages?.findIndex(msg => !msg?.isViewed)
        firstUnreadedIndex = firstUnreadedIndex !== -1 ? firstUnreadedIndex : messages?.length

        if (!firstRender.current && messages?.length) {
            firstRender.current = true
            virtualizer.scrollToIndex(firstUnreadedIndex, { align: 'start', })
        }
    }, [messages?.length, virtualizer])

    return (
        <div className={cls.chat}>
            <div ref={containerRef} className={cls.chat__window}>
                {hasMoreItems?.above && <Loader size={40} className={cls.chat__loader} />}
                <div style={{ height: `${virtualizer.getTotalSize()}px`, width: '100%', position: 'relative' }}>
                    {virtualizer.getVirtualItems().map((virtualRow) => {
                        const message = messages[virtualRow.index];
                        return (
                            <div
                                key={message?.id}
                                className={cls.chat__window__row}
                                ref={virtualRow.measureRef}
                                style={{ transform: `translateY(${virtualRow.start}px)` }}
                            >
                                <RenderMessage message={message} />
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
});

export default ConversationMessages;