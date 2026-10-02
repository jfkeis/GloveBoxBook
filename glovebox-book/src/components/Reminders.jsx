import React from "react"
import { ReminderRow } from "./ReminderRow"
import { remStatus } from '../utils/reminders'
import styles from './Reminders.module.css'

export function Reminders({ reminders, latestMi, du, onAdd, onEdit, onDelete }) {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <button onClick={onAdd} className={styles.addBtn}>+ Add reminder</button>
            </div>

            {reminders.length === 0
                ? <div className={styles.empty}>No reminders yet. Add recurring maintenance intervals.</div>
                : <div className={styles.list}>
                    {reminders.map(reminder => (
                        <ReminderRow
                            key={reminder.id}
                            reminder={reminder}
                            status={remStatus(reminder, latestMi)}
                            du={du}
                            onEdit={() => onEdit(reminder)}
                            onDelete={() => onDelete(reminder.id)}
                        />
                    ))}
                </div>
            }
        </div>
    )
}