import { useEffect, useState } from 'react';
import TabButton from '../../atoms/TabButton';
import cls from './Tabs.module.scss';
import { cn } from '@/utils/lib';

const Tabs = ({
    className,
    tabClassName,
    activeTabClassName,
    options = [],
    defaultValue,
    onChange
}) => {
    const [activeTab, setActiveTab] = useState(defaultValue || options?.[0]?.value)

    useEffect(() => {
        typeof onChange === 'function' && onChange(activeTab)
    }, [activeTab])

    return (
        <div className={cn(cls.tabs, className)}>
            {options?.map(option => (
                <TabButton
                    key={option.value}
                    onClick={() => setActiveTab(option.value)}
                    isActive={activeTab === option.value}
                    className={tabClassName}
                    activeClassName={activeTabClassName}
                >
                    {option?.label}
                </TabButton>
            ))}
        </div>
    );
}

export default Tabs;