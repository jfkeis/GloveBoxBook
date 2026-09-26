import styles from './ReminderRow.module.css'

function fmtDate(d) {
    if (!d) return ''
    return new Date(d).toLocaleDateString(undefined, { day: '2-digit', month: 'short', year: 'numeric' })
}

function fromMi(mi, unit) {
    return unit === 'km' ? mi * 1.60934 : mi
}

export function ReminderRow({ reminder, status, du, onEdit, onDelete }) {
    const { distLeft, daysLeft, overdue, urgent } = status

    const badgeText = status.overdue
        ? `${Math.abs(Math.round(status.distLeft)).toLocaleString()} ${du} overdue`
        : status.distLeft != null
        ? `${Math.round(status.distLeft).toLocaleString()} ${du} left`
        : status.daysLeft != null
        ? `${status.daysLeft} days left`
        : 'Scheduled'

    const badgeClass = overdue ? styles.badgeRed : urgent ? styles.badgeYellow : styles.badgeGreen

    return (
        <div className={styles.row}>
            <span className={styles.icon}>🔔</span>
            <div className={styles.content}>
                <div className={styles.titleRow}>
                    <span className={styles.name}>{reminder.name}</span>
                    <span className={`${styles.badge} ${badgeClass}`}>{badgeText}</span>
                </div>
                <div className={styles.detailRow}>
                    {reminder.intervalMi != null && (
                        <span className={styles.detail}>Every {Math.round(fromMi(reminder.intervalMi, du)).toLocaleString()} {du}</span>
                    )}
                    {reminder.intervalMonths && (
                        <span className={styles.detail}>· Every {reminder.intervalMonths} months</span>
                    )}
                    {reminder.lastMi != null && (
                        <span className={styles.detail}>· Last at {Math.round(fromMi(reminder.lastMi, du)).toLocaleString()} {du}</span>
                    )}
                    {reminder.lastDate && (
                        <span className={styles.detail}>· Last: {fmtDate(reminder.lastDate)}</span>
                    )}
                </div>
            </div>
            <div className={styles.actions}>
                <button className={styles.actionBtn} onClick={onEdit}>Edit</button>
                <button className={`${styles.actionBtn} ${styles.actionBtnDelete}`} onClick={onDelete}>Delete</button>
            </div>
        </div>
    )
}