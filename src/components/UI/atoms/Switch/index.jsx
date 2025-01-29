import React from "react";
import Switch from "react-switch";
import cls from "./switchDesign.module.scss";

export const SwitchComponent = ({
    offColor = "#f2f4f7",
    onColor = "#eff6ff",
    offHandleColor = "#9ca3af",
    onHandleColor = "#1e40af",
    checked = true,
    setChecked,
    isDisabled = true,
    className = "switch"
}) => {

    return (
        <label className={`${cls.switchContainer} ${isDisabled ? cls.disabled : ""}`}>
            <Switch
                checked={checked}
                onChange={() => setChecked(!checked)}
                checkedIcon={false}
                uncheckedIcon={false}
                handleDiameter={18}
                height={24}
                width={47}
                offColor={offColor}
                onColor={onColor}
                offHandleColor={offHandleColor}
                onHandleColor={onHandleColor}
                className={cls[className]}
            />
        </label>
    );
};
