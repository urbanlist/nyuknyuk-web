class Timer {
  constructor(action, ticks) {
    this.action = action;
    this.ticks = ticks;
    this.ticksCount = 0;
    this._timerId = null;
  }

  start() {
    this.stop();
    this._run();
    this.action();
  }

  _run() {
    this._timerId = window.setInterval(() => {
      if (this._timerId == null)
        return;

      this.ticksCount += 1;
      this.action();
    }, this.ticks);
  }

  stop() {
    if (this._timerId != null) {
      window.clearTimeout(this._timerId);
      this._timerId = null;
    }
    this.ticksCount = 0;
  }
}

export default Timer;