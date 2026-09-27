import React from 'react'
import styles from './Modal.module.css'

export function Modal ({ title, onClose, children}) {
    return (
        <div className={styles.overlay} onClick={e => e.target === e.currentTarget && onClose()}>
            <div className={styles.box}>
                <div className={styles.header}>
                    <h2 className={styles.title}>{title}</h2>
                    <button className={styles.closeBtn} onClick={onClose}>✕</button>
                </div>
                {children}
            </div>
        </div>
    )
}
