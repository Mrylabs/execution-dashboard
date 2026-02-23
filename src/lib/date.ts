export function getTodayDateString() {
  return new Date().toISOString().split("T")[0]
}

export function getYesterdayDateString() {
  const date = new Date()
  date.setDate(date.getDate() - 1)
  return date.toISOString().split("T")[0]
}