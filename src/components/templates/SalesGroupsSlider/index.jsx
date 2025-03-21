import { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SalesGroupCard from '@/components/UI/moleculs/SalesGroupCard';
import { LeftArrowIcon, RightArrowIcon } from '@/components/UI/atoms/icons';
import cls from './SalesGroupsSlider.module.scss';
import 'swiper/css';

const SalesGroupsSlider = () => {
    const swiperRef = useRef();
    const [swiperState, setSwiperState] = useState({ isBeginning: true, isEnd: false });

    return (
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
            <SwiperSlide>
                <SalesGroupCard />
            </SwiperSlide>
            <SwiperSlide>
                <SalesGroupCard />
            </SwiperSlide>
            <SwiperSlide>
                <SalesGroupCard />
            </SwiperSlide>
            <SwiperSlide>
                <SalesGroupCard />
            </SwiperSlide>
        </Swiper>
    );
}

export default SalesGroupsSlider;