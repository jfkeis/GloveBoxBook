const LOG_TYPES = {
  fillup:      { label: 'Fill-up',     icon: '⛽' },
  oilchange:   { label: 'Oil Change',  icon: '🔧' },
  oiladd:      { label: 'Oil Added',   icon: '🛢️' },
  maintenance: { label: 'Maintenance', icon: '🔩' },
}

export function LogRow({ log, onEdit, onDelete }) {
    const type = LOG_TYPES[log.type]

    return (
        <div>
            <span>{type.icon}</span>
            <span>{type.label}</span>
        </div>
    )
}