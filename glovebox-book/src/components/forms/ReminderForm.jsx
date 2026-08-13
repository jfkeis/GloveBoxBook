import React from 'react'

export function ReminderForm({ form, onFormChange, onSave, onCancel, du }) {
    return (
        <div>
            <label>Name</label>
            <input
                type="text"
                placeholder="e.g. Oil Change, Tire Rotation..."
                value={form.name || ''}
                onChange={e => onFormChange('name', e.target.value)}
            />
            <label>Interval Distance ({du})</label>
            <input
                type="number"
                placeholder='e.g. 5000 mi'
                value={form.intervalMi || ''}
                onChange={e => onFormChange('intervalMi', e.target.value)}
            />
            <label>Interval Time</label>
            <input
                type="number"
                placeholder='e.g. 6 months'
                value={form.intervalMonths || ''}
                onChange={e => onFormChange('intervalMonths', e.target.value)}
            />
            <label>Last Completion Mileage ({du})</label>
            <input
                type="number"
                placeholder='e.g. 225000 mi'
                value={form.lastMi || ''}
                onChange={e => onFormChange('lastMi', e.target.value)}
            />
            <label>Last Completion Date</label>
            <input
                type="date"
                placeholder='e.g. 06/12/2026'
                value={form.lastDate || ''}
                onChange={e => onFormChange('lastDate', e.target.value)}
            />
            <label>Notes</label>
            <input
                type="text"
                placeholder='e.g. 4.5 qt 5w-30 Valvoline'
                value={form.notes || ''}
                onChange={e => onFormChange('notes', e.target.value)}
            />

            {/* Save/Cancel */}
            <div>
                <button onClick={onSave}>Save</button>
                <button onClick={onCancel}>Cancel</button>
            </div>
        </div>
    )
}