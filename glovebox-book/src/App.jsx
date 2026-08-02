import React from 'react'
import { StatCard } from './components/StatCard'
import { LogRow } from './components/LogRow'

export default function App() {
  return (
    <div>
      <StatCard label="Current mileage" value="28,500 mi" />
      <StatCard label="Total fuel cost" value="$340.00" />
      <StatCard label="Avg. efficiency" value="32.4 MPG" />
      <LogRow
            log={{ type: 'fillup', date: '2026-01-15'}}
            onEdit={() => {}}
            onDelete={() => {}}
      />
    </div>
  )
}