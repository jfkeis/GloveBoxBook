import React from "react"

const LOG_TYPES = {
  fillup:      { label: 'Fill-up',     icon: '⛽' },
  oilchange:   { label: 'Oil Change',  icon: '🔧' },
  oiladd:      { label: 'Oil Added',   icon: '🛢️' },
  maintenance: { label: 'Maintenance', icon: '🔩' },
}



export function LogForm({ logType, onLogTypeChange, form, onFormChange, onSave, onCancel, du, vu, cu }) {
  return (
    <div>
        {Object.entries(LOG_TYPES).map(([key, val]) => (
            <button key={key} onClick={() => onLogTypeChange(key)}>
                {val.icon} {val.label}
            </button>
        ))}
        <div>
            <label>Date</label>
            <input
                type="date"
                value={form.date || ''}
                onChange={e => onFormChange('date', e.target.value)}
            />
        </div>

        <div>
            <label>Mileage ({du})</label>
            <input
                type="number"
                placeholder={du === 'mi' ? 'e.g. 28500' : 'e.g. 45800'}
                value={form.distDisp || ''}
                onChange={e => onFormChange('distDisp', e.target.value)}
            />
        </div>
    </div>
  )
}