import { memo, useCallback, useRef, useState, useEffect } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { getUserFullName } from '@/utils/lib';
import ChatCallMessage from '../../moleculs/ChatCallMessage';
import ChatTextMessage from '../../moleculs/ChatTextMessage';
import ChatCommentMessage from '../../moleculs/ChatCommentMessage';
import cls from './ConversationMessages.module.scss';

const ConversationMessages = memo(({
    messages = [],
    onBottomReach,
    onTopReach
}) => {
    const instanceRef = useRef()
    const containerRef = useRef(null);
    const prevScrollHeight = useRef(0);
    const scrollOffset = useRef(0)
    const [scrollWasNearTop, setScrollWasNearTop] = useState()
    const [isLoadingMore, setIsLoadingMore] = useState({ top: false, bottom: false });
    const [hasMoreItems, setHasMoreItems] = useState({ above: true, bellow: true })

    const virtualizer = useVirtualizer({
        paddingStart: 20,
        gap: 0,
        count: messages.length,
        getScrollElement: () => containerRef.current,
        estimateSize: () => 85,
        measureElement: (el) => el.getBoundingClientRect().height,
        overscan: 7,
        isScrollingResetDelay: 500,
        onChange: handleScroll
    });

    async function handleScroll(instance) {
        if (!instanceRef.current) instanceRef.current = instance

        const scrollHeight = instance.getTotalSize()
        prevScrollHeight.current = scrollHeight

        const virtualItems = instance.getVirtualItems()
        const firstVisibleIndex = virtualItems[0]?.index
        const lastVisibleItem = virtualItems[virtualItems.length - 1]
        const remainingItemsCount = messages.length - lastVisibleItem.index

        if (firstVisibleIndex <= 7 && !isLoadingMore.top && hasMoreItems?.above) {
            setIsLoadingMore(state => ({ ...state, top: true }))
            await onTopReach((messagesLength) => {
                scrollOffset.current = instance.scrollOffset
                setScrollWasNearTop(true)
                if (!messagesLength) setHasMoreItems(state => ({ ...state, above: false }))
            });
            setTimeout(() => setIsLoadingMore(state => ({ ...state, top: false })), 1000)
        } else if (remainingItemsCount <= 7 && !isLoadingMore.bottom && hasMoreItems?.bellow) {
            setIsLoadingMore(state => ({ ...state, bottom: true }))
            await onBottomReach((messagesLength) => {
                setScrollWasNearTop(false)
                if (!messagesLength) setHasMoreItems(state => ({ ...state, bellow: false }))
            })
            setTimeout(() => setIsLoadingMore(state => ({ ...state, bottom: false })), 1000)
        }
    }

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;


        if (scrollWasNearTop) {
            const instance = instanceRef.current
            const newScrollHeight = instance.getTotalSize()

            instance.scrollToOffset((newScrollHeight - prevScrollHeight.current) + scrollOffset.current)
        }

    }, [messages]);

    const renderMessage = useCallback((message, index) => {
        switch (message?.type) {
            case 'message':
                return (
                    <ChatTextMessage
                        message={message?.message?.text}
                        fullName={getUserFullName(message?.message?.whoSended === 'mentor' ? message?.message?.mentor : message?.message?.user)}
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
    }, []);

    return (
        <div className={cls.chat}>
            <div
                ref={containerRef}
                className={cls.chat__window}
                style={{
                    height: '100%',
                    overflow: 'auto',
                    position: 'relative',
                }}
            >
                <div
                    style={{
                        height: `${virtualizer.getTotalSize()}px`,
                        width: '100%',
                        position: 'relative',
                    }}
                >
                    {virtualizer.getVirtualItems().map((virtualRow) => {
                        const message = messages[virtualRow.index];
                        return (
                            <div
                                key={message?.id}
                                ref={virtualRow.measureRef}
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    transform: `translateY(${virtualRow.start}px)`,
                                }}
                            >
                                {renderMessage(message, virtualRow.index)}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
});

export default ConversationMessages;