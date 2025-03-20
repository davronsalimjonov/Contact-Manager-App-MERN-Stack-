import { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { LeftArrowIcon, PlusIcon, RightArrowIcon } from '@/components/UI/atoms/icons';
import Button from '@/components/UI/atoms/Buttons/Button';
import SalesGroupCard from '@/components/UI/moleculs/SalesGroupCard';
import cls from './SalesGroups.module.scss';
import 'swiper/css';

const SalesGroups = () => {
    const swiperRef = useRef();
    const [swiperState, setSwiperState] = useState({ isBeginning: true, isEnd: false });

    return (
        <div className={cls.page}>
            <div className={cls.page__header}>
                <h1 className={cls.page__header__title}>“MILLIARD” jamoasi</h1>
                <div className={cls.page__header__btns}>
                    <Button>Xodim qo’shish <PlusIcon /></Button>
                    <Button>Guruh qo’shish <PlusIcon /></Button>
                </div>
            </div>
            <Swiper
                className={cls.page__swiper}
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
                    <button className={cls.page__swiper__prev} onClick={() => swiperRef.current?.slidePrev()}>
                        <LeftArrowIcon />
                    </button>
                )}

                {!swiperState.isEnd && (
                    <button className={cls.page__swiper__next} onClick={() => swiperRef.current?.slideNext()}>
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
        </div>
    );
}

export default SalesGroups;