import React from 'react'
import { StatCard } from './StatCard'
import { LogRow } from './LogRow'
import { ReminderRow } from './ReminderRow'
import { displayCost, displayVolume } from '../utils/units'

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


}