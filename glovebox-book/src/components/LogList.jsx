import React, { useState } from 'react'
import { LogRow } from "./LogRow"

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
    <div>
        <button onClick={onAdd}>+ Add</button>
        
        {FILTERS.map(f => (
            <button key={f.key} onClick={() => setFilter(f.key)}>
                {f.label}
            </button>
        ))}
        {filtered.length === 0 && <p>No entries yet.</p>}

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
  )
}


