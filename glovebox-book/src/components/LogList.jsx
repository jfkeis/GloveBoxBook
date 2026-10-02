import React, { useState } from 'react'
import { LogRow } from "./LogRow"
import styles from './LogList.module.css'

const FILTERS = [
  { key: 'all', label: 'All' },
  { key: 'fillup', label: 'Fill-up' },
  { key: 'oilchange', label: 'Oil Change' },
  { key: 'oiladd', label: 'Oil Added' },
  { key: 'maintenance', label: 'Maintenance' },
]

export function LogList({ logs, du, vu, cu, onAdd, onEdit, onDelete }) {
  const [filter, setFilter] = useState('all')

  const filtered = filter === 'all'
    ? logs
    : logs.filter(l => l.type === filter)

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.filters}>
          {FILTERS.map(f => (
            <button
              key={f.key}
              className={`${styles.filterBtn} ${filter === f.key ? styles.filterBtnActive : ''}`}
              onClick={() => setFilter(f.key)}
            >
              {f.label}
            </button>
          ))}
        </div>
        <button className={styles.addBtn} onClick={onAdd}>+ Add</button>
      </div>

      {filtered.length === 0
        ? <div className={styles.empty}>No entries yet.</div>
        : <div className={styles.list}>
            {filtered.map(log => (
                <LogRow
                    key={log.id}
                    log={log}
                    du={du}
                    vu={vu}
                    onEdit={() => onEdit(log)}
                    onDelete={() => onDelete(log.id)}
                />
            ))}
        </div>
        }
      </div>
  )
}


