
const PieChartHeader = ({
    title = ""
}) => {
  return (
    <>
        <h1 style={{ 
            fontSize: "20px",
            fontWeight: "600"   
        }}>{title}</h1>
    </>
  )
}

export default PieChartHeader