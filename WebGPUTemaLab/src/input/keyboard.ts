export class InputManager {
  private static keysPressed: Record<string, boolean> = {
    a: false,
    d: false,
    ' ': false,
  };

   /**
   * billentyu lenyomas es felengedes esemeny incializalasa
   */
  static initialize(): void {
    window.addEventListener('keydown', (e) => this.handleKeyDown(e));
    window.addEventListener('keyup', (e) => this.handleKeyUp(e));
  }

   /**
   * billentyu lenyomas kezelese
   * @param KeyboardEvent - billentyuzet event
   */
  private static handleKeyDown(e: KeyboardEvent): void {
    if (e.key in this.keysPressed) {
      this.keysPressed[e.key] = true;
    }
  }

   /**
   * billentyu felengedes kezelese
   * @param KeyboardEvent - billentyuzet event
   */
  private static handleKeyUp(e: KeyboardEvent): void {
    if (e.key in this.keysPressed) {
      this.keysPressed[e.key] = false;
    }
  }

   /**
   * lenyomott billentyuk lekerese
   * @returns lenyomott billentyuk
   */
  static getKeysPressed(): Record<string, boolean> {
    return { ...this.keysPressed };
  }

   /**
   * billentyu lenyomsanak ellenorzese
   * @param key - lenyomott billentyu
   * @returns logika valtozot, lenyomta-e a gombot vagy nem
   */
  static isKeyPressed(key: string): boolean {
    return this.keysPressed[key] ?? false;
  }

   /**
   * billentyu lenyomasok resetelese
   */
  static reset(): void {
    this.keysPressed = {
      a: false,
      d: false,
      ' ': false,
    };
  }
}
