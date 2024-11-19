import cls from './PageNotFound.module.scss';

const PageNotFound = () => {
    return (
        <div className={cls.page}>
            <img className={cls.page__image} src="/images/page-not-found.svg" alt="Page not found" />
            <h1 className={cls.page__title}>Sahifa mavjud emas tez orada buni bartaraf etamiz.</h1>
        </div>
    );
}

export default PageNotFound;