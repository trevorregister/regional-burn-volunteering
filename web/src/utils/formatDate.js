export function formatDate(dateString) {
  const date = new Date(dateString)
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

  const dayName = days[date.getDay()]
  const monthName = months[date.getMonth()]
  const dayOfMonth = date.getDate()

  return {
    dayName: dayName,
    monthName: monthName,
    dayOfMonth: dayOfMonth
  }
}