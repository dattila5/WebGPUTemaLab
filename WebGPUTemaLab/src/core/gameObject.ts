export type GameObject = {
    x: number;           // Pozíció X
    y: number;           // Pozíció Y
    width: number;       // Szélesség
    height: number;      // Magasság
    type: 'player' | 'platform' | 'enemy' | 'spike';  // Típus
    name?: string;       // Opcionális név
};
