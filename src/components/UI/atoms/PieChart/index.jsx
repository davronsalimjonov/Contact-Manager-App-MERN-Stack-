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
      tooltip: {
        enabled: false,
      },
      datalabels: {
        anchor: 'end',
        align: 'end',
        padding: 4,
      }
    },
    cutout: id === 0 ? '50%' : "70%"
  }

  return (
    <div style={{ width: '260px', height: id === 0 ? '200px' : '260px' }}>
      <Pie 
        data={data} 
        options={options} 
        plugins={[
          {
              id: 'customLabels',
              afterDraw: (chart) => {
                const { ctx, chartArea: { width, height } } = chart;
                const meta = chart.getDatasetMeta(0);
                const centerX = width / 2;
                const centerY = height / 2;

                meta.data.forEach((element, index) => {
                    const { startAngle, endAngle, outerRadius } = element;
                    const angle = (startAngle + endAngle) / 2;
                    const labelRadius = outerRadius + 20;
                    const xStart = centerX + outerRadius * Math.cos(angle);
                    const yStart = centerY + outerRadius * Math.sin(angle);
                    const xEnd = centerX + labelRadius * Math.cos(angle);
                    const yEnd = centerY + labelRadius * Math.sin(angle);

                    // Draw line starting from the edge of the doughnut section
                    ctx.beginPath();
                    ctx.moveTo(xStart, yStart);
                    ctx.lineTo(xEnd, yEnd);
                    ctx.strokeStyle = data.datasets[0].backgroundColor[index];
                    ctx.stroke();

                    // Draw text
                    ctx.font = "bold 16px Arial";
                    ctx.fillStyle = data.datasets[0].backgroundColor[index];
                    ctx.textAlign = xEnd < centerX ? "right" : "left";
                    ctx.fillText(data.datasets[0].data[index], xEnd, yEnd);
                });
            },
          },
      ]}

      />
    </div>
  )
}

export default PieChart
