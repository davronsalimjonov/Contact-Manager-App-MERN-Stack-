import cls from './StudentActionHistory.module.scss';

const StudentActionHistory = () => {
    return (
        <div className={cls.history}>
            <div className={cls.history__header}>
                <h2 className={cls.history__header__title}>Harakatlar tarixi</h2>
                {/* <div className={cls.history__header__date}>
                    <span className={cls.history__header__date__label}>Kurs ochildi:</span>
                    <span className={cls.history__header__date__value}>02.11.2024  16:06</span>
                </div> */}
            </div>
            <div className={cls.history__card}>
                Malumotlar tez orada paydo bo'ladi
            </div>
        </div>
    );
}

export default StudentActionHistory;