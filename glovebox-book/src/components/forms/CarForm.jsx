import React from 'react'

export function CarForm({ form, onFormChange, onSave, onCancel}) {
    return (
        <div>
            <label>Name</label>
            <input
                type="text"
                placeholder="e.g. Patrick, Red Rocket, Sasha..."
                value={form.name || ''}
                onChange={e => onFormChange('name', e.target.value)}
            />
            <label>Make</label>
            <input
                type="text"
                placeholder='e.g. Honda'
                value={form.make || ''}
                onChange={e => onFormChange('make', e.target.value)}
            />
            <label>Model</label>
            <input
                type="text"
                placeholder='e.g. Civic'
                value={form.model || ''}
                onChange={e => onFormChange('model', e.target.value)}
            />
            <label>Year</label>
            <input
                type="number"
                placeholder='e.g. 1990'
                value={form.year || ''}
                onChange={e => onFormChange('year', e.target.value)}
            />
            <label>License Plate</label>
            <input
                type="text"
                placeholder='e.g. KLUQ123'
                value={form.plate || ''}
                onChange={e => onFormChange('plate', e.target.value)}
            />
            <label>Distance Unit</label>
            <button onClick={() => onFormChange('distUnit', 'mi')}>mi</button>
            <button onClick={() => onFormChange('distUnit', 'km')}>km</button>
            
            <label>Volume Unit</label>
            <button onClick={() => onFormChange('volUnit', 'gal')}>gal</button>
            <button onClick={() => onFormChange('volUnit', 'L')}>L</button>

            <label>Currency</label>
            <button onClick={() => onFormChange('curUnit', 'USD')}>USD</button>
            <button onClick={() => onFormChange('curUnit', 'EUR')}>EUR</button>

            <label>Color</label>
            <input
            type="color"
            value={form.color || '#2563eb'}
            onChange={e => onFormChange('color', e.target.value)}
            />

            {/* Save/Cancel */}
            <div>
                <button onClick={onSave}>Save</button>
                <button onClick={onCancel}>Cancel</button>
            </div>
        </div>
    )
}