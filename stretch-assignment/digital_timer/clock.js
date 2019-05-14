class Clock {
    /**
     * @constructor
     * @param {number} timeLimit How long should this clock tick for, in seconds?
     * @param {number} tickSpeed How fast should this clock tick, in milliseconds?
     */
    constructor({ timeLimit = 10, tickSpeed = 10 } = {}) {
        this._id = null
        this._timeLimit = timeLimit * 1000
        this._tickSpeed = tickSpeed
        this._isTicking = false
        this._currentTime = 0

        this._events = {
            start: [],
            stop: [],
            reset: [],
            tick: []
        }
    }

    on(event, callback) {
        let selectedEvent = this._events[event]

        if (!isArray(selectedEvent)) {
            selectedEvent = []
        }

        selectedEvent.push(callback)
    }

    start() {
        this._events.start.forEach(cb => cb(this._currentTime))

        const onTick = () => {
            this._currentTime += this._tickSpeed
            this._events.tick.forEach(cb => cb(this._currentTime))

            if (this._currentTime >= this._timeLimit) {
                return this.stop()
            }
        }

        this._id = setInterval(onTick, this._tickSpeed)
    }

    stop() {
        clearInterval(this._id)
        this._events.stop.forEach(cb => cb(this._currentTime, this._timeLimit))
    }

    reset() {
        this.stop()
        this._currentTime = 0
        this._events.reset.forEach(cb => cb(this._currentTime))
    }
}
