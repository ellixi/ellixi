export function randInt(min: number, max: number): number {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1) + min) //The maximum is inclusive and the minimum is inclusive 
}

export function getNightDensity(curTime: number, dayTime: number) {
    let nightDensity = (curTime / 1000) % dayTime // scale to [0, 20)
    nightDensity = Math.abs(nightDensity - dayTime / 2) // [0, 20) => [0, 10]
    nightDensity -= dayTime / 4 // [0, 10] => [-5, 5)
    nightDensity = 0.9 / (1 + Math.pow(Math.E, -10 * nightDensity)) // sigmoid to (0, 0.9)

    return {
        isNight: nightDensity > 0.5,
        nightDensity
    }
}


