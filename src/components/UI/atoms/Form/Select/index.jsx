import ReactSelect, { components } from 'react-select'
import cls from './Select.module.scss';

const Select = ({
    onChange,
    placeholder = '',
    options = [],
    isClearable,
    ...otherProps
}) => {
    return (
        <ReactSelect
            components={{
                Menu: (props) => <components.Menu {...props} className={cls.menu} />
            }}
            className={cls.select}
            options={options}
            placeholder={placeholder}
            onChange={onChange}
            isClearable={isClearable}
            {...otherProps}
        />
    );
}

export default Select;