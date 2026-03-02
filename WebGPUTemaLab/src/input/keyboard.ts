// Pozíció és input tárolása
let squarePosition = { x: 0.0, y: 0.0 };

const keysPressed = {
    w: false,
    s: false,
    a: false,
    d: false,
};

// Billentyűzet hallgatás
function initKeyboardInput() {
    window.addEventListener('keydown', (e) => {
        if (e.key in keysPressed) {
            keysPressed[e.key as keyof typeof keysPressed] = true;
        }
    });

    window.addEventListener('keyup', (e) => {
        if (e.key in keysPressed) {
            keysPressed[e.key as keyof typeof keysPressed] = false;
        }
    });
}

export { squarePosition, keysPressed, initKeyboardInput };
