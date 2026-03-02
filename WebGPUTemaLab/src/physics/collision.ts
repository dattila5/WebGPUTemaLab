import type { GameObject } from '../core/gameObject';

// AABB (Axis-Aligned Bounding Box) ütközés
export function checkCollision(
    obj1: GameObject,
    obj2: GameObject
): boolean {
    return (
        obj1.x < obj2.x + obj2.width &&
        obj1.x + obj1.width > obj2.x &&
        obj1.y < obj2.y + obj2.height &&
        obj1.y + obj1.height > obj2.y
    );
}

// Ütközés egy objektum és összes platform között
export function checkPlatformCollision(
    player: GameObject,
    platforms: GameObject[]
): GameObject | null {
    for (let platform of platforms) {
        if (checkCollision(player, platform)) {
            return platform;
        }
    }
    return null;
}
