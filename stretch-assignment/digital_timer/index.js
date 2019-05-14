const clock = new Clock({
    timeLimit: parseInt(
        prompt("How long would you like the clock to run for?", "10s")
    ),
    tickSpeed: 10
})
const cache = {}
const $clock = $qs(".digits")
const $digits = $clock.$qsa(".digit")

const renderClock = ({ secondTens, secondOnes, msHundreds, msTens }) => {
    if (cache.secondTens !== secondTens) {
        $digits[0].textContent = secondTens
    }
    if (cache.secondOnes !== secondOnes) {
        $digits[1].textContent = secondOnes
    }
    if (cache.msHundreds !== msHundreds) {
        $digits[3].textContent = msHundreds
    }
    if (cache.msTens !== msTens) {
        $digits[4].textContent = msTens
    }

    cache.secondTens = secondTens
    cache.secondOnes = secondOnes
    cache.msHundreds = msHundreds
    cache.msTens = msTens
}

clock.on("start", () => {
    alert("Clock is starting!")
})

clock.on("tick", time => {
    const parsedTime = parseTime(time)
    const formattedTime = formatTime(parsedTime)
    renderClock(formattedTime)
})

clock.on("stop", time => {
    const parsedTime = parseTime(time)
    const formattedTime = formatTime(parsedTime)
    renderClock(formattedTime)
})

clock.start()
