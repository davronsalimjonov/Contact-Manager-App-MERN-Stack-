import ReactSelect, { components } from 'react-select'
import cls from './Select.module.scss';


const options = [
    { value: 'Unit 1', label: 'Unit 1' },
    { value: 'Unit 2', label: 'Unit 2' },
    { value: 'Unit 3', label: 'Unit 3' },
    { value: 'Unit 4', label: 'Unit 4' },
]

const Select = ({
    placeholder = ''
}) => {
    return (
        <ReactSelect
            components={{
                Menu: (props) => <components.Menu {...props} className={cls.menu} />
            }}
            className={cls.select}
            options={options}
            placeholder={placeholder}
        />
    );
}

export default Select;