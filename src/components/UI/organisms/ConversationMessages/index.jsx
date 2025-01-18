import { useVirtualizer } from '@tanstack/react-virtual';
import { useRef, useState, useEffect, useLayoutEffect, useContext } from 'react';
import useDebounce from '@/hooks/useDebounce';
import { MessageTypes } from '@/constants/enum';
import { useTaskMutations } from '@/hooks/useTask';
import { ChatMessageEditContext } from '@/providers/ChatMessageEditProvider';
import Loader from '../../atoms/Loader';
import RenderMessage from '../RenderChatMessage';
import ChatScrollButton from '../ChatScrollButton';
import cls from './ConversationMessages.module.scss';

const OVERSCAN_COUNT = 50;
const DEBOUNCE_DELAY = 300;
const SCROLL_THRESHOLD = 20;
const DEFAULT_ESTIMATE_SIZE = 18;

const addDateSeparators = (messages) => {
    const processedMessages = [];

    messages.forEach((message) => {
        if (message?.dateSeperator) {
            processedMessages.push({ id: message.dateSeperator, type: MessageTypes.DATE_SEPARATOR, date: message.dateSeperator });
        }
        processedMessages.push(message);
    });

    return processedMessages;
};

const ConversationMessages = ({
    userCourseId = '',
    initialMessageIndex,
    messages = [],
    onBottomReach,
    onTopReach,
    onMessageVisible,
    hasAboveMessages = true,
    hasBelowMessages = true,
    unreadedMessagesCount = 0
}) => {
    messages = addDateSeparators(messages);
    
    const { statusChangeMutation } = useTaskMutations(userCourseId)
    const { handleSetMessage } = useContext(ChatMessageEditContext);
    const [isFirstRender, setIsFirstRender] = useState(false);
    const [isVisibleButton, setIsVisibleButton] = useState(false);
    const [scrollState, setScrollState] = useState({
        wasMessagesAddedOnTop: false,
        wasMessagesAddedOnBottom: false,
        hasMoreItems: { above: hasAboveMessages, below: hasBelowMessages },
        isLoadingMore: { top: false, bottom: false }
    });

    const refs = useRef({
        container: null,
        firstRender: false,
        prevScrollHeight: 0,
        scrollOffset: 0,
        sizeCache: {},
        resizeObserver: null,
        observedMessages: new Set(),
        scrolling: false
    });

    useEffect(() => {
        refs.current.resizeObserver = new ResizeObserver((entries) => {
            let needsUpdate = false;

            for (const entry of entries) {
                const messageId = entry.target.getAttribute('data-message-id');
                if (messageId) {
                    const newHeight = entry.contentRect.height;
                    if (newHeight !== refs.current.sizeCache[messageId]) {
                        refs.current.sizeCache[messageId] = newHeight;
                        needsUpdate = true;
                    }
                }
            }

            if (needsUpdate) {
                virtualizer.measure();
            }
        });

        return () => {
            if (refs.current.resizeObserver) {
                refs.current.resizeObserver.disconnect();
                refs.current.observedMessages.clear();
            }
        };
    }, []);

    const shouldObserveMessage = (message) => {
        return message.type === MessageTypes.TASK
    };

    const handleScroll = useDebounce(async (instance) => {
        const scrollHeight = instance.getTotalSize();
        refs.current.prevScrollHeight = scrollHeight;

        const virtualItems = instance.getVirtualItems();
        const firstVisibleIndex = virtualItems[0]?.index;
        const lastVisibleItem = virtualItems[virtualItems.length - 1];
        const remainingItemsCount = messages.length - lastVisibleItem.index;

        if (firstVisibleIndex <= SCROLL_THRESHOLD && !scrollState.isLoadingMore.top && scrollState.hasMoreItems?.above) {
            setScrollState(state => ({ ...state, isLoadingMore: { ...state.isLoadingMore, top: true } }))
            await onTopReach((hasMoreItems) => {
                refs.current.scrollOffset = instance.scrollOffset
                setScrollState(state => ({ ...state, wasMessagesAddedOnTop: true }))
                if (!hasMoreItems) setScrollState(state => ({ ...state, hasMoreItems: { ...state.hasMoreItems, above: false } }))
            });
            setScrollState(state => ({ ...state, isLoadingMore: { ...state.isLoadingMore, top: false } }))
        } else if (remainingItemsCount <= SCROLL_THRESHOLD && !scrollState.isLoadingMore.bottom && scrollState.hasMoreItems?.below) {
            setScrollState(state => ({ ...state, isLoadingMore: { ...state.isLoadingMore, bottom: true } }))
            await onBottomReach((hasMoreItems) => {
                setScrollState(state => ({ ...state, wasMessagesAddedOnBottom: true }))
                if (!hasMoreItems) setScrollState(state => ({ ...state, hasMoreItems: { ...state.hasMoreItems, below: false } }))
            })
            setScrollState(state => ({ ...state, isLoadingMore: { ...state.isLoadingMore, bottom: false } }))
        }
    }, DEBOUNCE_DELAY);

    const virtualizer = useVirtualizer({
        gap: 37,
        paddingEnd: 20,
        paddingStart: 20,
        count: messages?.length,
        getScrollElement: () => refs.current.container,
        estimateSize: (index) => {
            const message = messages[index];
            const messageId = message?.id;
            return refs.current.sizeCache[messageId] || DEFAULT_ESTIMATE_SIZE;
        },
        measureElement: (el) => {
            const messageId = el.getAttribute('data-message-id');
            const message = messages.find(m => m.id === messageId);

            if (messageId && message && shouldObserveMessage(message)) {
                // Начинаем наблюдение только если еще не наблюдаем
                if (!refs.current.observedMessages.has(messageId)) {
                    refs.current.resizeObserver?.observe(el);
                    refs.current.observedMessages.add(messageId);
                }
            }

            const height = el.getBoundingClientRect().height || DEFAULT_ESTIMATE_SIZE;
            refs.current.sizeCache[messageId] = height;

            return height;
        },
        overscan: OVERSCAN_COUNT,
        onChange: handleScroll,
    });

    const handleScrollToBottom = () => {
        const offset = virtualizer.getScrollOffset()
        const scrollSize = virtualizer.getTotalSize()
        const behavior = (scrollSize - offset) < 17000 ? 'smooth' : 'auto'

        setTimeout(() => {
            virtualizer.scrollToIndex(messages?.length - 1, { align: 'start', behavior })
            setTimeout(() => refs.current.scrolling = false)
        })
    }

    useEffect(() => {
        if (!refs.current.scrolling) {
            setTimeout(() => {
                const scrollSize = (virtualizer.getTotalSize() || 0) - (virtualizer?.scrollRect?.height || 0);
                const scrollOffset = (virtualizer.scrollOffset || 0);
                const scrollSizeFromBottom = scrollSize - scrollOffset;
                setIsVisibleButton(isFirstRender && scrollSize > 0 && scrollSizeFromBottom > 20)
            }, 100)
        }
    }, [virtualizer.scrollOffset, messages?.length]);

    useLayoutEffect(() => {
        const firstUnreadIndex = messages?.findIndex(msg => msg.index === initialMessageIndex);
        const scrollIndex = firstUnreadIndex !== -1 ? firstUnreadIndex : messages?.length;

        if (!isFirstRender && messages?.length) {
            setTimeout(() => virtualizer.scrollToIndex(scrollIndex, { align: 'start', behavior: 'auto' }))
            setTimeout(() => setIsFirstRender(true), 10);
        }
    }, [messages?.length, virtualizer]);

    useEffect(() => {
        const container = refs.current.container;
        if (!container) return;
        const lastMessage = messages?.at(-1);
        const isUserGeneratedMessage = lastMessage?.shouldScroll;

        if (scrollState.wasMessagesAddedOnTop) {
            virtualizer.measure()
            requestAnimationFrame(() => {
                const newScrollHeight = virtualizer.getTotalSize();
                virtualizer.scrollToOffset((newScrollHeight - refs.current.prevScrollHeight) + refs.current.scrollOffset);
                setScrollState(state => ({ ...state, wasMessagesAddedOnTop: false }))
            })
        } else if (scrollState.wasMessagesAddedOnBottom) {
            setScrollState(state => ({ ...state, wasMessagesAddedOnBottom: false }))
        }

        if (isUserGeneratedMessage) {
            refs.current.scrolling = true
            handleScrollToBottom()
            lastMessage.shouldScroll = false
        }
    }, [messages.length, virtualizer]);

    const cleanupMessageObserver = (messageId) => {
        if (refs.current.observedMessages.has(messageId)) {
            const elements = document.querySelectorAll(`[data-message-id="${messageId}"]`);
            elements.forEach(el => refs.current.resizeObserver?.unobserve(el));
            refs.current.observedMessages.delete(messageId);
        }
    };

    // Очистка при удалении сообщений
    useEffect(() => {
        const currentMessageIds = new Set(messages.map(m => m.id));
        [...refs.current.observedMessages].forEach(messageId => {
            if (!currentMessageIds.has(messageId)) {
                cleanupMessageObserver(messageId);
            }
        });
    }, [messages]);

    return (
        <div className={cls.chat}>
            <div ref={(el) => refs.current.container = el} className={cls.chat__window} style={{ opacity: isFirstRender ? 1 : 0, transition: 'opacity 0.2s ease', willChange: 'transform' }}>
                {scrollState.hasMoreItems.above && messages?.length > 0 && (<Loader size={40} className={cls.chat__loader} />)}
                <div style={{ height: `${virtualizer.getTotalSize()}px`, width: '100%', position: 'relative', willChange: 'transform' }}>
                    {virtualizer.getVirtualItems().map((virtualRow) => {
                        const message = messages[virtualRow.index];

                        return (
                            <div
                                key={message?.id}
                                className={cls.chat__window__row}
                                ref={virtualizer.measureElement}
                                data-message-id={message?.id}
                                data-index={virtualRow.index}
                                style={{ transform: `translateY(${virtualRow.start}px)`, willChange: 'transform' }}
                            >
                                <RenderMessage
                                    message={message}
                                    skipObserver={message?.index <= initialMessageIndex || message?.type === MessageTypes.DATE_SEPARATOR}
                                    onMessageVisible={onMessageVisible}
                                    onEditMessage={() => handleSetMessage(message)}
                                    onTaskComplete={statusChangeMutation.mutate}
                                />
                            </div>
                        );
                    })}
                </div>
                {scrollState.hasMoreItems.below && messages?.length > 0 && (<Loader size={40} className={cls.chat__loader} />)}
            </div>
            <ChatScrollButton
                isOpened={isVisibleButton}
                onClick={handleScrollToBottom}
                count={unreadedMessagesCount}
            />
        </div>
    );
}

export default ConversationMessages;