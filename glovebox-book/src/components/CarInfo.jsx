import React from "react"
import { StatCard } from "./StatCard"
import { usdToEur, galToL, round, displayCost, displayVolume } from '../utils/units'

export function CarInfo({ car, logs, onEditCar }) {
    const totalFuelCost = logs
        .filter(l => l.type === 'fillup')
        .reduce((sum, log) => sum + (log.usdStored || 0), 0)
    const totalMaintenanceCost = logs
        .filter(l => l.type === 'maintenance')
        .reduce((sum, log) => sum + (log.usdStored || 0), 0)
    const totalFuelVolume = logs
        .filter(l => l.type === 'fillup')
        .reduce((sum, log) => sum + (log.galStored || 0), 0)
    const totalOilChanges = logs
        .filter(l => l.type === 'oilchange')
        .length

    return(
        <div>
            {/* Car details */}
            <div>
                <p>{car.name}</p>
                <p>{car.year} {car.make} {car.model}</p>
                {car.plate && <p>{car.plate}</p>}
                <button onClick={onEditCar}>Edit car info</button>
            </div>

            {/* Stats */}
            <div>
                <StatCard label="Total fuel cost" value={displayCost(totalFuelCost, car.curUnit)} />
                <StatCard label="Total maintenance cost" value={displayCost(totalMaintenanceCost, car.curUnit)} />
                <StatCard label="Total fuel volume" value={displayVolume(totalFuelVolume, car.volUnit)} />
                <StatCard label="Oil changes" value={totalOilChanges} />
            </div>
        </div>
    )
    
}

