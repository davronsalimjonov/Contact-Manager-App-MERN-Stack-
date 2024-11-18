import ReactSelect, { components } from 'react-select'
import cls from './Select.module.scss';
import { CloseIcon } from '../../icons';
import { cn } from '@/utils/lib';

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
    options = [],
    isClearable,
    placeholder = '',
    className = '',
    isSearchable = true,
    ...otherProps
}) => {
    return (
        <ReactSelect
            components={{
                Menu: (props) => <components.Menu {...props} className={cls.menu} />,
                ClearIndicator,
                DropdownIndicator
            }}
            className={cn(cls.select, className)}
            options={options}
            placeholder={placeholder}
            onChange={onChange}
            isClearable={isClearable}
            isSearchable={isSearchable}
            {...otherProps}
        />
    );
}

export default Select;