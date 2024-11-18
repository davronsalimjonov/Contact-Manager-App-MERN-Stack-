
export const pieChartData = [
    {
        id: 0,
        title: "O'qigan Kurslari Bo'yicha",
        labels: ["Adrian", "Perfectly", "Small Talk"],
        values: [40, 30, 30],
        chartColors: ["rgba(255, 207, 84, 0.8)", "rgba(66, 120, 226, 0.8)", "rgba(255, 51, 51, 0.8)"]
    },
    {
        id: 1,
        title: "O'quvchilar Darajasi Bo'yicha",
        labels: ["A1", "A2", "B1", "B2", "C1", "C2"],
        values: [20, 35, 20, 20, 73, 18],
        chartColors: ["rgba(18, 86, 219, 0.8)", "rgba(255, 52, 219, 0.8)", "rgba(255, 210, 95, 0.8)", "rgba(255, 51, 51, 0.8)", "rgba(100, 2, 205, 0.8)", "rgba(39, 205, 2, 0.8)"],
        background: [
            "rgba(18, 86, 219, 0.1)",
            "rgba(255, 52, 219, 0.1)",
            "rgba(255, 210, 95, 0.1)",
            "rgba(255, 51, 51, 0.1)",
            "rgba(100, 2, 205, 0.1)",
            "rgba(235, 250, 239, 1)"
        ],
        borders: [
            "rgba(18, 86, 219, 0.2)",
            "rgba(255, 52, 219, 0.2)",
            "rgba(255, 210, 95, 0.2)",
            "rgba(255, 51, 51, 0.2)",
            "rgba(100, 2, 205, 0.2)",
            "rgba(214, 244, 222, 1)"
        ]
    }
]

export const lineChartData = {
    January: Array(31).fill().map(() => Math.floor(Math.random() * 100)),
    February: Array(28).fill().map(() => Math.floor(Math.random() * 100)),
    March: Array(31).fill().map(() => Math.floor(Math.random() * 100)),
    April: Array(30).fill().map(() => Math.floor(Math.random() * 100)),
    May: Array(31).fill().map(() => Math.floor(Math.random() * 100)),
    June: Array(30).fill().map(() => Math.floor(Math.random() * 100)),
    July: Array(31).fill().map(() => Math.floor(Math.random() * 100)),
    August: Array(31).fill().map(() => Math.floor(Math.random() * 100)),
    September: Array(30).fill().map(() => Math.floor(Math.random() * 100)),
    October: Array(31).fill().map(() => Math.floor(Math.random() * 100)),
    November: [0, 69, 17, 32, 20, 41, 11, 57, 52, 92, 42],
    December: Array(31).fill().map(() => Math.floor(Math.random() * 100)),
}