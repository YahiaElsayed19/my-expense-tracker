export const getFormattedDate = (date) => {
    return date.toISOString().slice(0, 10)
    // return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
}
export const getDataMinusDate = (date, days) => {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate() - days)
}