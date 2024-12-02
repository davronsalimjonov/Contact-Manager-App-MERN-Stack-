import { memo, useRef, useState, useEffect } from 'react';
import useDebounce from '@/hooks/useDebounce';
import { formatMessageDate, getUserFullName } from '@/utils/lib';
import { MessageTypes } from '@/constants/enum';
import { useVirtualizer } from '@tanstack/react-virtual';
import Loader from '../../atoms/Loader';
import ChatCallMessage from '../../moleculs/ChatCallMessage';
import ChatTextMessage from '../../moleculs/ChatTextMessage';
import ChatCommentMessage from '../../moleculs/ChatCommentMessage';
import cls from './ConversationMessages.module.scss';
import ChatDateSeparator from '../../moleculs/ChatDateSeparator';

const SCROLL_THRESHOLD = 15;
const DEFAULT_ESTIMATE_SIZE = 85;
const DEBOUNCE_DELAY = 300;
const OVERSCAN_COUNT = 50;

const groupMessagesByDate = (messages) => {
    return messages.reduce((grouped, message) => {
        const date = new Date(message.createdAt).toDateString();
        if (!grouped[date]) {
            grouped[date] = {
                dateLabel: formatMessageDate(message.createdAt),
                messages: []
            };
        }
        grouped[date].messages.push(message);
        return grouped;
    }, {});
};

const RenderMessage = memo(({ message }) => {
    switch (message?.type) {
        case MessageTypes.TEXT:
            return (
                <ChatTextMessage
                    date={message?.createdAt}
                    message={message?.message?.text}
                    fullName={getUserFullName(message?.message?.whoSended === 'mentor' ? message?.message?.mentor : message?.message?.user) + ' ' + message?.index}
                />
            );
        case MessageTypes.CALL:
            return (
                <ChatCallMessage
                    recordUrl={message?.call?.audio}
                    recordDuration={message?.call?.duration}
                />
            );
        case MessageTypes.COMMENT:
            return (
                <ChatCommentMessage
                    text={message?.comment?.text}
                    fullName={getUserFullName(message?.comment?.owner)}
                />
            );
        default: return null;
    }
});

const ConversationMessages = ({
    messages = [],
    onBottomReach,
    onTopReach
}) => {
    const [scrollState, setScrollState] = useState({
        wasMessagesAddedOnTop: false,
        wasMessagesAddedOnBottom: false,
        hasMoreItems: { above: true, below: true },
        isLoadingMore: { top: false, bottom: false }
    });

    const refs = useRef({
        container: null,
        firstRender: false,
        prevScrollHeight: 0,
        scrollOffset: 0,
        sizeCache: {}
    });

    const groupedMessages = Object.values(groupMessagesByDate(messages)).flatMap(group => [
        { type: 'date_separator', dateLabel: group.dateLabel },
        ...group.messages
    ]);

    const handleScroll = useDebounce(async (instance) => {
        const scrollHeight = instance.getTotalSize();
        refs.current.prevScrollHeight = scrollHeight;

        const virtualItems = instance.getVirtualItems();
        const firstVisibleIndex = virtualItems[0]?.index;
        const lastVisibleItem = virtualItems[virtualItems.length - 1];
        const remainingItemsCount = messages.length - lastVisibleItem.index;

        if (firstVisibleIndex <= SCROLL_THRESHOLD && !scrollState.isLoadingMore.top && scrollState.hasMoreItems?.above) {
            setScrollState(state => ({ ...state, isLoadingMore: { ...state.isLoadingMore, top: true } }))
            await onTopReach((messagesLength) => {
                refs.current.scrollOffset = instance.scrollOffset
                setScrollState(state => ({ ...state, wasMessagesAddedOnTop: true }))
                if (!messagesLength) setScrollState(state => ({ ...state, hasMoreItems: { ...state.hasMoreItems, above: false } }))
            });
            setScrollState(state => ({ ...state, isLoadingMore: { ...state.isLoadingMore, top: false } }))
        } else if (remainingItemsCount <= SCROLL_THRESHOLD && !scrollState.isLoadingMore.bottom && scrollState.hasMoreItems?.below) {
            setScrollState(state => ({ ...state, isLoadingMore: { ...state.isLoadingMore, bottom: true } }))
            await onBottomReach((messagesLength) => {
                setScrollState(state => ({ ...state, wasMessagesAddedOnBottom: true }))
                if (!messagesLength) setScrollState(state => ({ ...state, hasMoreItems: { ...state.hasMoreItems, below: false } }))
            })
            setScrollState(state => ({ ...state, isLoadingMore: { ...state.isLoadingMore, bottom: false } }))
        }
    }, DEBOUNCE_DELAY);

    const virtualizer = useVirtualizer({
        paddingStart: 20,
        gap: 0,
        count: groupedMessages?.length,
        getScrollElement: () => refs.current.container,
        estimateSize: () => DEFAULT_ESTIMATE_SIZE,
        measureElement: (el, index) => {
            console.log('Measuring element:', el);
            const height = el.getBoundingClientRect().height;
            console.log('Measured height:', height);
            return height;
        },
        overscan: OVERSCAN_COUNT,
        onChange: handleScroll
    });

    useEffect(() => {
        virtualizer.measure();
    }, [groupedMessages?.length]);

    // Scroll adjustment when new messages are loaded
    useEffect(() => {
        const container = refs.current.container;
        if (!container) return;
        const lastMessage = messages?.at(-1);
        const isUserGeneratedMessage = lastMessage?.shouldScroll;

        if (scrollState.wasMessagesAddedOnTop) {
            const newScrollHeight = virtualizer.getTotalSize();
            virtualizer.scrollToOffset((newScrollHeight - refs.current.prevScrollHeight) + refs.current.scrollOffset);
            setScrollState(state => ({ ...state, wasMessagesAddedOnTop: false }))
        } else if (scrollState.wasMessagesAddedOnBottom) {
            setScrollState(state => ({ ...state, wasMessagesAddedOnBottom: false }))
        }

        if (isUserGeneratedMessage) {
            virtualizer.scrollToIndex(messages?.length - 1, { align: 'center', behavior: 'smooth' });
            lastMessage.shouldScroll = false
        }

    }, [messages.length, virtualizer]);


    // Initial scroll to first unread message
    useEffect(() => {
        const firstUnreadIndex = messages?.findIndex(msg => !msg?.isViewed) || -1;
        const scrollIndex = firstUnreadIndex !== -1 ? firstUnreadIndex : messages?.length;

        if (!refs.current.firstRender && messages?.length) {
            refs.current.firstRender = true;
            virtualizer.scrollToIndex(scrollIndex, { align: 'start' });
        }

    }, [messages?.length, virtualizer]);

    return (
        <div className={cls.chat}>
            <div ref={(el) => refs.current.container = el} className={cls.chat__window}>
                {scrollState.hasMoreItems.above && (<Loader size={40} className={cls.chat__loader} />)}
                <div style={{ height: `${virtualizer.getTotalSize()}px`, width: '100%', position: 'relative' }}>
                    {virtualizer.getVirtualItems().map((virtualRow) => {
                        const message = groupedMessages[virtualRow.index];

                        if (message?.type === 'date_separator') {
                            return (
                                <div
                                    key={`date-${message.dateLabel}`}
                                    className={cls.chat__window__row}
                                    ref={virtualRow.measureRef}
                                    style={{ transform: `translateY(${virtualRow.start}px)` }}
                                >
                                    <ChatDateSeparator date={message?.dateLabel} />
                                </div>
                            );
                        }

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
}

export default ConversationMessages;