import React from 'react'

export function StatCard({ label, value }) {
    return(
        <div>
            <p>{label}</p>
            <p>{value}</p>
        </div>
    )
}