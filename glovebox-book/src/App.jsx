import React from 'react'
import { StatCard } from './components/StatCard'
import { LogRow } from './components/LogRow'
import { ReminderRow } from './components/ReminderRow'
import { Modal } from './components/Modal'

export default function App() {
  return (
    <div>
      <StatCard label="Current mileage" value="28,500 mi" />
      <StatCard label="Total fuel cost" value="$340.00" />
      <StatCard label="Avg. efficiency" value="32.4 MPG" />
      <LogRow
          log={{ type: 'fillup', date: '2026-01-15', miStored: 28500, mpg: 32.4, galStored: 11.2 }}
          onEdit={() => {}}
          onDelete={() => {}}
          du="mi"
          vu="gal"
      />
      <ReminderRow
        reminder={{ name: 'Oil Change', intervalMi: 5000, lastMi: 27700 }}
        status={{ distLeft: 800, daysLeft: null, urgent: true, overdue: false }}
        du="mi"
        onEdit={() => {}}
        onDelete={() => {}}
      />
      <Modal title="Test Modal" onClose={() => {}}>
        <p>Hello from inside the modal</p>
      </Modal>
    </div>
  )
}