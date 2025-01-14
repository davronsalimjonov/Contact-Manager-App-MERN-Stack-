import cls from './SellersDashboard.module.scss';

const SellersDashboard = () => {
    return (
        <iframe 
            className={cls.frame}
            src='http://sales.mt'
            width='100%'
            height='100%'
            frameBorder={0}
        />
    );
}

export default SellersDashboard;