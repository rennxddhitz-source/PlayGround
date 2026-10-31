export class GlobalEventBus {
  private eventListeners: Map<string, Array<(...args: any[]) => void>> = new Map();

  public addEventListener(eventName: string, listener: (...args: any[]) => void): void {
    if (!this.eventListeners.has(eventName)) {
      this.eventListeners.set(eventName, []);
    }
    this.eventListeners.get(eventName)!.push(listener);
  }

  public removeEventListener(eventName: string, listener: (...args: any[]) => void): void {
    const listeners = this.eventListeners.get(eventName);
    if (listeners) {
      const index = listeners.indexOf(listener);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    }
  }

  public triggerEvent(eventName: string, ...args: any[]): void {
    const listeners = this.eventListeners.get(eventName);
    if (listeners) {
      for (const listener of listeners) {
        listener(...args);
      }
    }
  }
}