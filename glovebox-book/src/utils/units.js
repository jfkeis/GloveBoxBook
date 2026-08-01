export const KM_PER_MI = 1.60934
export const L_PER_GAL = 3.78541
export const USD_PER_EUR = 0.92

export function miToKm(miles) {
    return miles * KM_PER_MI
}

export function kmToMi(kilometers) {
    return kilometers/KM_PER_MI
}

export function galToL(gallons) {
    return gallons*L_PER_GAL
}

export function lToGal(liters) {
    return liters/L_PER_GAL
}

export function usdToEur(usd) {
    return usd*USD_PER_EUR
}

export function eurToUsd(euros) {
    return euros/USD_PER_EUR
}

export function round(value, decimals) {
    if (value == null || isNaN(value)) {
        return null
    }
    return value.toFixed(decimals)
}