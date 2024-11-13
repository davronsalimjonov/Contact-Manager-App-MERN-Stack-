import ReactSelect, { components } from 'react-select'
import cls from './Select.module.scss';
import { CloseIcon } from '../../icons';

const ClearIndicator = (props) => {
    return (
        <components.ClearIndicator {...props} className={cls.closeIcon}>
            <CloseIcon />
        </components.ClearIndicator>
    );
};

const DropdownIndicator = (props) => {
    return props.selectProps.isClearable && props.hasValue ? null : (
        <components.DropdownIndicator {...props} className={cls.arrowIcon} />
    );
};

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
                Menu: (props) => <components.Menu {...props} className={cls.menu} />,
                ClearIndicator,
                DropdownIndicator
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