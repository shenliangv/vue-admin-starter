interface TimerCallback {
  (timeRemaining: number, interval: number, duration: number): void
}

export default class Timer {
  private interval: number

  private duration: number

  private timeRemaining: number

  private callback: TimerCallback

  constructor(interval: number, duration: number, callback: TimerCallback) {
    this.interval = interval
    this.timeRemaining = this.duration = duration
    this.callback = callback
  }

  start() {
    this.callback(this.timeRemaining, this.interval, this.duration)
    this.repeat()
  }

  private repeat() {
    setTimeout(() => {
      this.timeRemaining -= this.interval
      this.callback(this.timeRemaining, this.interval, this.duration)

      if (this.timeRemaining > 0) {
        this.repeat()
      }
    }, this.interval)
  }
}
