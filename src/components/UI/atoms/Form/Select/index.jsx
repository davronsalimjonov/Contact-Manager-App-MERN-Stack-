import ReactSelect, { components } from 'react-select'
import { cn } from '@/utils/lib';
import { CloseIcon } from '../../icons';
import cls from './Select.module.scss';


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
    error,
    isMulti=false,
    ...otherProps
}) => {
    return (
        <ReactSelect
            components={ {
                Menu: (props) => <components.Menu {...props} className={cls.menu} />,
                ClearIndicator,
                DropdownIndicator,
            }}
            className={cn(cls.select, error && cls.error, className)}
            options={options}
            placeholder={placeholder}
            onChange={onChange}
            isClearable={isClearable}
            isSearchable={isSearchable}
            isMulti={isMulti}
            {...otherProps}
        />
    );
}

export default Select;