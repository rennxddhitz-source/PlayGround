export enum GameState {
  LOBBY,
  MATCHMAKING,
  IN_GAME,
  POST_MATCH
}

export class GameStateManager {
  private currentState: GameState = GameState.LOBBY;
  private stateListeners: ((newState: GameState, oldState: GameState) => void)[] = [];

  public getCurrentState(): GameState {
    return this.currentState;
  }

  public addStateListener(listener: (newState: GameState, oldState: GameState) => void): void {
    this.stateListeners.push(listener);
  }

  public transitionTo(newState: GameState): void {
    const oldState = this.currentState;
    if (oldState === newState) {
      return;
    }
    this.currentState = newState;
    for (const listener of this.stateListeners) {
      listener(newState, oldState);
    }
    console.log(`GameState transitioned from ${GameState[oldState]} to ${GameState[newState]}`);
  }
}