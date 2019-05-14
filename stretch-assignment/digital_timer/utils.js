const isArray = val => val && val.constructor === Array

const parseTime = ms => {
    if (isNaN(ms) || ms < 1) {
        return {
            seconds: 0,
            milliseconds: 0
        }
    }

    const seconds = Math.floor(ms / 1000)
    const milliseconds = Math.floor(ms - seconds * 1000)

    return {
        seconds,
        milliseconds
    }
}

const formatTime = ({ seconds, milliseconds }) => {
    const time = {
        secondTens: "0",
        secondOnes: "0",
        msHundreds: "0",
        msTens: "0"
    }
    if (isNaN(seconds) && seconds < 1) return time
    if (isNaN(milliseconds) && milliseconds < 1) return time

    const secondsString = seconds < 10 ? `0${seconds}` : `${seconds}`
    const msString = milliseconds < 10 ? `0${milliseconds}` : `${milliseconds}`

    time.secondTens = secondsString[0]
    time.secondOnes = secondsString[1]
    time.msHundreds = msString[0]
    time.msTens = msString[1]

    return time
}

const $qs = document.querySelector.bind(document)
const $qsa = document.querySelectorAll.bind(document)
Element.prototype.$qsa = function(...args) {
    return this.querySelectorAll.call(this, args)
}
Element.prototype.$qs = function(...args) {
    return this.querySelector.call(this, args)
}
