import SalesChart from '@/components/UI/organisms/SalesChart';
import SellerStatisticsCards from '@/components/templates/SellerStatisticsCards';
import cls from './SellerStatistics.module.scss';

const SellerStatistics = () => {
    return (
        <div className={cls.page}>
            <SellerStatisticsCards />
            <SalesChart />
        </div>
    );
}

export default SellerStatistics;