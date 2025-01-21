import cls from './DropdownMenu.module.scss';

const DropdownMenu = ({
    items = [],
    onClick
}) => {
    return (
        items?.length > 0 && (
            <div className={cls.menu}>
                {
                    items?.map((item, index) => (
                        <button
                            key={index}
                            className={cls.menu__item}
                            onClick={() => (item?.onClick?.(), onClick?.())}
                        >
                            {item?.label}
                        </button>
                    ))
                }
            </div>
        )
    );
}

export default DropdownMenu;