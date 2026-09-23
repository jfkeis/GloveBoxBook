export function remStatus(reminder, latestMi) {
    let distLeft = null
    let daysLeft = null

    if (reminder.intervalMi && reminder.lastMi != null && latestMi != null) {
        distLeft = (reminder.lastMi + reminder.intervalMi) - latestMi
    }

    if (reminder.intervalMonths && reminder.lastDate) {
        const due = new Date(reminder.lastDate)
        due.setMonth(due.getMonth() + reminder.intervalMonths)
        daysLeft = Math.round((due - new Date()) / 86400000)
    }

    const overdue = (distLeft != null && distLeft < 0) || (daysLeft != null && daysLeft < 0)
    const urgent = !overdue && ((distLeft != null && distLeft <= 500) || (daysLeft != null && daysLeft <= 14))

    return { distLeft, daysLeft, overdue, urgent }
}