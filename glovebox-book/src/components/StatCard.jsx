import React from 'react'
import styles from './StatCard.module.css'

export function StatCard({ label, value, color }) {
    return (
        <div className={styles.card} style={{ background: color || 'linear-gradient(135deg, #2468c8 0%, #1a54aa 100%)' }}>
            <p className={styles.label}>{label}</p>
            <p className={styles.value}>{value}</p>
        </div>
    )
}