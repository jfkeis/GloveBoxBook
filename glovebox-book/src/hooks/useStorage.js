import {useState, useCallback} from 'react'

export function useStorage(key, fallback) {
    const [value, setValue] = useState(() => {
        try {
            const item = localStorage.getItem(key)
            return item ? JSON.parse(item) : fallback
        } catch {
            return fallback
        }
    })
}