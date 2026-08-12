import React from 'react'

const LOG_TYPES = {
  fillup:      { label: 'Fill-up',     icon: '⛽' },
  oilchange:   { label: 'Oil Change',  icon: '🔧' },
  oiladd:      { label: 'Oil Added',   icon: '🛢️' },
  maintenance: { label: 'Maintenance', icon: '🔩' },
}

export function LogForm({ logType, onLogTypeChange, form, onFormChange, onSave, onCancel, du, vu, cu }) {
  return (
    <div>

      {/* Type selector */}
      {Object.entries(LOG_TYPES).map(([key, val]) => (
        <button key={key} onClick={() => onLogTypeChange(key)}>
          {val.icon} {val.label}
        </button>
      ))}

      {/* Date */}
      <div>
        <label>Date</label>
        <input
          type="date"
          value={form.date || ''}
          onChange={e => onFormChange('date', e.target.value)}
        />
      </div>

      {/* Mileage */}
      <div>
        <label>Mileage ({du})</label>
        <input
          type="number"
          placeholder={du === 'mi' ? 'e.g. 28500' : 'e.g. 45800'}
          value={form.distDisp || ''}
          onChange={e => onFormChange('distDisp', e.target.value)}
        />
      </div>

      {/* Fill-up fields */}
      {logType === 'fillup' && (
        <div>
          <label>Volume ({vu})</label>
          <input
            type="number"
            placeholder={vu === 'gal' ? 'e.g. 11.230' : 'e.g. 42.50'}
            value={form.volDisp || ''}
            onChange={e => onFormChange('volDisp', e.target.value)}
          />
          <label>Cost ({cu})</label>
          <input
            type="number"
            placeholder="e.g. 68.00"
            value={form.costDisp || ''}
            onChange={e => onFormChange('costDisp', e.target.value)}
          />
          <label>Station (optional)</label>
          <input
            type="text"
            placeholder="e.g. Shell, BP…"
            value={form.station || ''}
            onChange={e => onFormChange('station', e.target.value)}
          />
        </div>
      )}

      {/* Oil change fields */}
      {logType === 'oilchange' && (
        <div>
          <label>Oil brand/spec (optional)</label>
          <input
            type="text"
            placeholder="e.g. Mobil 1 5W-30"
            value={form.oilBrand || ''}
            onChange={e => onFormChange('oilBrand', e.target.value)}
          />
          <label>Cost ({cu})</label>
          <input
            type="number"
            placeholder="e.g. 85.00"
            value={form.costDisp || ''}
            onChange={e => onFormChange('costDisp', e.target.value)}
          />
        </div>
      )}

      {/* Oil added fields */}
      {logType === 'oiladd' && (
        <div>
          <label>Amount added ({vu})</label>
          <input
            type="number"
            placeholder={vu === 'gal' ? 'e.g. 0.132' : 'e.g. 0.5'}
            value={form.oilVolDisp || ''}
            onChange={e => onFormChange('oilVolDisp', e.target.value)}
          />
          <label>Oil brand (optional)</label>
          <input
            type="text"
            placeholder="e.g. Mobil 1 5W-30"
            value={form.oilBrand || ''}
            onChange={e => onFormChange('oilBrand', e.target.value)}
          />
        </div>
      )}

      {/* Maintenance fields */}
      {logType === 'maintenance' && (
        <div>
          <label>Description</label>
          <input
            type="text"
            placeholder="e.g. Brake pads replaced"
            value={form.description || ''}
            onChange={e => onFormChange('description', e.target.value)}
          />
          <label>Shop/Mechanic (optional)</label>
          <input
            type="text"
            placeholder="e.g. Jiffy Lube"
            value={form.shop || ''}
            onChange={e => onFormChange('shop', e.target.value)}
          />
          <label>Cost ({cu})</label>
          <input
            type="number"
            placeholder="e.g. 320.00"
            value={form.costDisp || ''}
            onChange={e => onFormChange('costDisp', e.target.value)}
          />
          <label>Labor hours (optional)</label>
          <input
            type="number"
            placeholder="e.g. 2.5"
            value={form.hours || ''}
            onChange={e => onFormChange('hours', e.target.value)}
          />
        </div>
      )}

      {/* Notes */}
      <div>
        <label>Notes (optional)</label>
        <textarea
          rows={2}
          placeholder="Any notes…"
          value={form.notes || ''}
          onChange={e => onFormChange('notes', e.target.value)}
        />
      </div>

      {/* Save/Cancel */}
      <div>
        <button onClick={onSave}>Save</button>
        <button onClick={onCancel}>Cancel</button>
      </div>

    </div>
  )
}