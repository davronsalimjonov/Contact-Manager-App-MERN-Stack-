export const formatDate = (currentDate) => {
    const date = new Date(currentDate);
    const formattedDate = `${date.getDate().toString().padStart(2,'0')}.${(date.getMonth() + 1).toString().padStart(2,'0')}.${date.getFullYear()}`;
   return formattedDate;
}

