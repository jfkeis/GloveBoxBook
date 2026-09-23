import React from 'react'
import { Dashboard } from './components/Dashboard'

const testCar = {
  id: 'car1',
  name: 'My Car',
  make: 'Honda',
  model: 'Civic',
  year: 2019,
  distUnit: 'mi',
  volUnit: 'gal',
  curUnit: 'USD',
  color: '#2563eb'
}

const testLogs = [
  { id: '1', type: 'fillup', date: '2026-01-15', miStored: 28500, galStored: 11.2, usdStored: 68.00, mpg: 32.4 },
  { id: '2', type: 'oilchange', date: '2026-01-10', miStored: 28200, usdStored: 85.00 },
  { id: '3', type: 'maintenance', date: '2025-12-01', miStored: 27000, usdStored: 320.00, description: 'Brake pads replaced' },
]

const testReminders = [
  { id: 'r1', name: 'Oil Change', intervalMi: 5000, lastMi: 27700 },
  { id: 'r2', name: 'Tire Rotation', intervalMi: 7500, lastMi: 25000 },
]

export default function App() {
  return (
    <div>
      <Dashboard
        car={testCar}
        logs={testLogs}
        reminders={testReminders}
        du={testCar.distUnit}
        vu={testCar.volUnit}
        cu={testCar.curUnit}
        onAddLog={() => {}}
        onEditLog={() => {}}
        onDeleteLog={() => {}}
        onAddReminder={() => {}}
        onEditReminder={() => {}}
        onDeleteReminder={() => {}}
      />
    </div>
  )
}