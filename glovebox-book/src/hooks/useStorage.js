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

    const set = useCallback((next) => {
        const v = typeof next === 'function' ? next(value) : next
        setValue(v)
        try {
            localStorage.setItem(key, JSON.stringify(v))
        } catch {}
    }, [key, value])

    return [value, set]
}