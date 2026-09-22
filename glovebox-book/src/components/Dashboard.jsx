import React from 'react'
import { StatCard } from './StatCard'
import { LogRow } from './LogRow'
import { ReminderRow } from './ReminderRow'
import { displayCost, displayVolume } from '../utils/units'
import { remStatus } from '../utils/reminders'

export function Dashboard({ car, logs, reminders, du, vu, cu, onAddLog, onEditLog, onDeleteLog, onAddReminder, onEditReminder, onDeleteReminder }) {

    const latestMi = logs
        .filter(l => l.miStored != null)
        .sort((a, b) => b.miStored - a.miStored)[0]?.miStored

    const fillups = logs.filter(l => l.type === 'fillup')

    const withMpg = fillups.filter(l => l.mpg != null)
    const avgEfficiency = withMpg.length > 0
        ? withMpg.reduce((sum, l) => sum + l.mpg, 0) / withMpg.length
        : null

    const totalFuelCost = fillups
        .reduce((sum, l) => sum + (l.usdStored || 0), 0)

    const maintenanceItems = logs.filter(l => l.type === 'maintenance')
    const totalMaintenanceCost = maintenanceItems
        .reduce((sum, l) => sum+ (l.usdStored || 0), 0)

    const recentLogs = logs
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 5)
    
    const upcomingReminders = reminders.slice(0, 3)

    <button onClick={() => onAddLog('fillup')}>⛽ Fill-up</button>
    <button onClick={() => onAddLog('oilchange')}>🔧 Oil Change</button>
    <button onClick={() => onAddLog('oiladd')}>🛢️ Oil Added</button>
    <button onClick={() => onAddLog('maintenance')}>🔩 Maintenance</button>
}