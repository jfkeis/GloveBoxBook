import { kmToMi, lToGal, round } from '../utils/units'

export function ReminderRow({ reminder, status, du, onEdit, onDelete }) {

    const badgeColor = status.overdue ? 'red' : status.urgent ? 'orange' : 'green'

    const badgeText = status.overdue
        ? `${Math.abs(Math.round(status.distLeft)).toLocaleString()} ${du} overdue`
        : status.distLeft != null
        ? `${Math.round(status.distLeft).toLocaleString()} ${du} left`
        : status.daysLeft != null
        ? `${status.daysLeft} days left`
        : 'Scheduled'

    return (
        <div>
            <span>🔔</span>
            <span>{reminder.name}</span><span style={{ color: badgeColor }}>{badgeText}</span>
            <button onClick={onEdit}>Edit</button>
            <button onClick={onDelete}>Delete</button>
            <div>
                {reminder.intervalMi && (
                    <span>Every {Math.round(reminder.intervalMi).toLocaleString()} {du}</span>
                )}
                {reminder.lastMi && (
                    <span>Last at {Math.round(reminder.lastMi).toLocaleString()} {du}</span>
                )}
                {reminder.intervalMonths && (
                    <span>Every {reminder.intervalMonths} months</span>
                )}
                {reminder.lastDate && (
                    <span>Last: {reminder.lastDate}</span>
                )}
            </div>
        </div>
    )
}