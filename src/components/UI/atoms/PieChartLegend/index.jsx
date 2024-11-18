import cls from './PieChartLegend.module.scss'

const PieChartLegend = ({
    labels = [],
    values = [],
    colors = [],
    background = [],
    borders = [],
    id = 0
}) => {

    console.log(background[1], 'hahahha');
    
  return (
    labels.map((item, idx) => (
        <div className={id === 0 ? cls.PieChartLegend : cls.row} key={`PieChartLegend-${id}-${idx}`}>
            <div>
                <div style={{ 
                    backgroundColor: colors[idx],
                    height: "8px",
                    width: "8px",
                    borderRadius: "50%",
                }}></div>
                <h3>{item}</h3>
            </div>
            <div>
                <h1 style={{
                    color: id === 1 ? colors[idx] : "",
                    border: id === 1 ? borders[idx] : "",
                    borderStyle: id === 1 ? "solid" : "",
                    borderWidth: id === 1 ? "1px" : "",
                    background: id === 1 ? background[idx] : "",
                    padding: id === 1 ? "4px 6px" : "",
                    borderRadius: id === 1 ? "8px" : "",
                    fontSize: id === 1 ? "16px" : ""
                }}>{values[idx]}</h1>
            </div>
        </div>
    ))
  )
}

export default PieChartLegend