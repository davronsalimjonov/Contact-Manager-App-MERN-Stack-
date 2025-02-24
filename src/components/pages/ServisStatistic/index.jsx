import Tabs from '@/components/UI/moleculs/Tabs';
import cls from './ServisStatistic.module.scss';

const ServisStatistic = () => {

    return (
        <div className={cls.layout}>
            <Tabs
                tabClassName={cls.layout__tab}
                options={[
                    { value: 'null', label: 'Dars bo\'yicha statistika' },
                    { value: 'active', label: 'Call bo\'yicha statistika' },
                ]}
            />
            <div></div>
        </div>
    )
}

export default ServisStatistic;