export function fillMissingSalesData(data = [], type) {
    if (type === "daily") {
        const filledDaily = [];
        const dateSet = new Set(data.map(entry => entry.date));

        const now = new Date();
        const startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        const endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0);

        let currentDate = new Date(startDate);

        while (currentDate <= endDate) {
            const dateString = currentDate.toISOString().split('T')[0];
            const day = currentDate.getDate();
            if (dateSet.has(dateString)) {
                const existingEntry = data.find(entry => entry.date === dateString);
                filledDaily.push({ label: String(day), sum: existingEntry.sum });
            } else {
                filledDaily.push({ label: String(day), sum: 0 });
            }
            currentDate.setDate(currentDate.getDate() + 1);
        }

        return filledDaily;
    } else if (type === "monthly") {
        const filledMonthly = [];
        const monthSet = new Set(data.map(entry => entry.month));

        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

        for (const month of months) {
            if (monthSet.has(month)) {
                const existingEntry = data.find(entry => entry.month === month);
                filledMonthly.push({ label: month, sum: existingEntry.sum });
            } else {
                filledMonthly.push({ label: month, sum: 0 });
            }
        }

        return filledMonthly;
    } else if (type === "yearly") {
        return data?.map(entry => ({ label: entry.year, sum: entry.sum }))
    } else return data
}