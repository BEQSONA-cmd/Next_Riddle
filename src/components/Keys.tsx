const keys: Record<string, boolean> = {};

const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "ArrowLeft" || event.key === "ArrowRight" || event.key === "w" || event.key === "s" || event.key === "a" || event.key === "d") {
      keys[event.key] = true;
    }
    if (event.key === " ") {
      keys[" "] = true; // Spacebar is pressed to jump
    }
  };
  
  const handleKeyUp = (event: KeyboardEvent) => {
    if (event.key === "ArrowLeft" || event.key === "ArrowRight" || event.key === "w" || event.key === "s" || event.key === "a" || event.key === "d") {
      keys[event.key] = false;
    }
    if (event.key === " ") {
      keys[" "] = false; // Spacebar is released
    }
  };
export { handleKeyDown, handleKeyUp, keys };
