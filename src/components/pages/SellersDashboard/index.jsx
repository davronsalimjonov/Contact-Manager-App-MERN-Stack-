import cls from './SellersDashboard.module.scss';

const salestatUrl = import.meta.env.VITE_APP_SALESTAT_URL;

const SellersDashboard = () => {
    return (
        <iframe 
            className={cls.frame}
            src={salestatUrl}
            width='100%'
            height='100%'
            frameBorder={0}
        />
    );
}

export default SellersDashboard;