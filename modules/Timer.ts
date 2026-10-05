export default class Timer {
  private startTime: number = 0;

  start(): void {
    this.startTime = Date.now();
  }

  stop(): number {
    return Date.now() - this.startTime;
  }
}
