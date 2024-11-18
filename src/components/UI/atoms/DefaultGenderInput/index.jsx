import cls from "./DefaultGenderInput.module.scss"

const DefaultGenderInput = ({
    label = "",
    isDefault = false
}) => {
  return (
    <div className={cls.DefaultGenderInput}>
        <label style={{
          marginLeft: "10px"
        }}>{label}</label>
        {isDefault ? 
            <input type="radio" defaultChecked style={{ 
              fontWeight: 400,
              marginRight: "10px"
            }} />
        : 
            <input type="radio" style={{ 
              fontWeight: 400,
              marginRight: "10px"
            }} />}
    </div>
  )
}

export default DefaultGenderInput