import { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SalesGroupCard from '@/components/UI/moleculs/SalesGroupCard';
import { LeftArrowIcon, RightArrowIcon } from '@/components/UI/atoms/icons';
import SalesGroupFormModal from '@/components/UI/organisms/SalesGroupFormModal';
import cls from './SalesGroupsSlider.module.scss';
import 'swiper/css';

const SalesGroupsSlider = ({ items = [], activeGroup, onClickGroup }) => {
    const swiperRef = useRef();
    const [isOpenGroupModal, setIsOpenGroupModal] = useState(false)
    const [swiperState, setSwiperState] = useState({ isBeginning: true, isEnd: false });

    return (
        <>
            <SalesGroupFormModal
                key={activeGroup?.id}
                isOpen={isOpenGroupModal}
                groupId={activeGroup?.id}
                onClose={() => setIsOpenGroupModal(false)}
            />
            <Swiper
                className={cls.swiper}
                spaceBetween={24}
                slidesPerView={3}
                onSwiper={(swiper) => swiperRef.current = swiper}
                onSlideChange={() => {
                    if (swiperRef.current) {
                        setSwiperState({ isBeginning: swiperRef.current.isBeginning, isEnd: swiperRef.current.isEnd });
                    }
                }}
                onAfterInit={(swiper) => setSwiperState({ isBeginning: swiper.isBeginning, isEnd: swiper.isEnd })}
            >
                {!swiperState.isBeginning && (
                    <button className={cls.swiper__prev} onClick={() => swiperRef.current?.slidePrev()}>
                        <LeftArrowIcon />
                    </button>
                )}
                {!swiperState.isEnd && (
                    <button className={cls.swiper__next} onClick={() => swiperRef.current?.slideNext()}>
                        <RightArrowIcon />
                    </button>
                )}
                {items?.length > 0 && items.map((item, index) => (
                    <SwiperSlide key={index}>
                        <SalesGroupCard
                            title={item?.title}
                            logoUrl={item?.image?.url}
                            plan={item?.monthPlans?.plan}
                            isActive={item?.id === activeGroup?.id}
                            onClick={() => onClickGroup(item)}
                            onClickEdit={() => setIsOpenGroupModal(true)}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </>
    );
}

export default SalesGroupsSlider;