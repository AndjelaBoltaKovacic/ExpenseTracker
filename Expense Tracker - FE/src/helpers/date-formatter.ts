export function formatDate(timestamp: string) {
    const inputDate = new Date(timestamp);

    const day = inputDate.getDate();
    const month = inputDate.getMonth() + 1;
    const year = inputDate.getFullYear();

    return `${day}.${month}.${year}.`;
}