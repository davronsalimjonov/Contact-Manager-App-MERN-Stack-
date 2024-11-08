import React from 'react'
import { Pie } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip } from 'chart.js'

ChartJS.register(ArcElement, Tooltip)

const PieChart = ({ labels = [], values = [], colors = [], id = 0 }) => {
  const data = {
    labels: labels,
    datasets: [
      {
        data: values,
        backgroundColor: colors,
        borderColor: 'rgba(255, 255, 255, 1)',
        borderWidth: 1,
        borderRadius: 6
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false, 
    plugins: {
      legend: {
        display: false, 
      },
    },
    cutout: id === 0 ? '50%' : "70%" 
  }

  return (
    <div style={{ width: '260px', height: id === 0 ? '200px' : '260px' }}>
      <Pie data={data} options={options} />
  </div>
  )
}

export default PieChart
