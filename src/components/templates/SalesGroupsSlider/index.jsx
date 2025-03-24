import toast from 'react-hot-toast';
import { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useSetGroupPlanMutation } from '@/hooks/useSales';
import PlanFormModal from '@/components/UI/organisms/PlanFormModal';
import SalesGroupCard from '@/components/UI/moleculs/SalesGroupCard';
import { LeftArrowIcon, RightArrowIcon } from '@/components/UI/atoms/icons';
import SalesGroupFormModal from '@/components/UI/organisms/SalesGroupFormModal';
import cls from './SalesGroupsSlider.module.scss';
import 'swiper/css';

const SalesGroupsSlider = ({ items = [], activeGroup, onClickGroup }) => {
    const swiperRef = useRef();
    const [isOpenGroupModal, setIsOpenGroupModal] = useState(false)
    const [planModal, setPlanModal] = useState({ isOpen: false, groupId: null })
    const [swiperState, setSwiperState] = useState({ isBeginning: true, isEnd: false });
    const setGroupPlanMutation = useSetGroupPlanMutation()

    const handleSetPlan = async (data) => {
        await setGroupPlanMutation.mutateAsync({ id: planModal?.groupId, body: data }, {
            onSuccess: () => {
                toast.success('Plan qo’yildi')
                setPlanModal({ isOpen: false, groupId: null })
            },
            onError: (error) => toast.error(error?.response?.data?.message || 'Xatolik yuz berdi')
        })
    }

    return (
        <>
            <SalesGroupFormModal
                key={activeGroup?.id}
                isOpen={isOpenGroupModal}
                groupId={activeGroup?.id}
                onClose={() => setIsOpenGroupModal(false)}
            />
            <PlanFormModal
                title='Guruhga plan qo’yish'
                isOpen={planModal?.isOpen}
                onClose={() => setPlanModal({ isOpen: false, groupId: null })}
                onSubmit={handleSetPlan}
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
                            onClickSetPlan={() => setPlanModal({ isOpen: true, groupId: item?.id})}
                            onClickEdit={() => setIsOpenGroupModal(true)}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </>
    );
}

export default SalesGroupsSlider;