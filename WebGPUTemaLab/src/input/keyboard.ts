export class InputManager {
  private static keysPressed: Record<string, boolean> = {
    a: false,
    d: false,
    ' ': false,
  };

  static initialize(): void {
    window.addEventListener('keydown', (e) => this.handleKeyDown(e));
    window.addEventListener('keyup', (e) => this.handleKeyUp(e));
  }

  private static handleKeyDown(e: KeyboardEvent): void {
    if (e.key in this.keysPressed) {
      this.keysPressed[e.key] = true;
    }
  }

  private static handleKeyUp(e: KeyboardEvent): void {
    if (e.key in this.keysPressed) {
      this.keysPressed[e.key] = false;
    }
  }

  static getKeysPressed(): Record<string, boolean> {
    return { ...this.keysPressed };
  }

  static isKeyPressed(key: string): boolean {
    return this.keysPressed[key] ?? false;
  }

  static reset(): void {
    this.keysPressed = {
      a: false,
      d: false,
      ' ': false,
    };
  }
}
