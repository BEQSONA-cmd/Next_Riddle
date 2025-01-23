const keys: Record<string, boolean> = {};

const handleKeyDown = (e: KeyboardEvent) => {
    keys[e.key] = true;
};

const handleKeyUp = (e: KeyboardEvent) => {
    keys[e.key] = false;
};

export { handleKeyDown, handleKeyUp, keys };
