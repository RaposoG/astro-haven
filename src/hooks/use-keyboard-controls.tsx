"use client";

import { useEffect, useState } from "react";

interface KeyState {
  forward: boolean;
  backward: boolean;
  left: boolean;
  right: boolean;
  shoot: boolean;
  shield: boolean;
  turbo: boolean;
}

export function useKeyboardControls() {
  const [keys, setKeys] = useState<KeyState>({
    forward: false,
    backward: false,
    left: false,
    right: false,
    shoot: false,
    shield: false,
    turbo: false,
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.repeat) return;

      switch (e.key.toLowerCase()) {
        case "w":
        case "arrowup":
          setKeys((prev) => ({ ...prev, forward: true }));
          break;
        case "s":
        case "arrowdown":
          setKeys((prev) => ({ ...prev, backward: true }));
          break;
        case "a":
        case "arrowleft":
          setKeys((prev) => ({ ...prev, left: true }));
          break;
        case "d":
        case "arrowright":
          setKeys((prev) => ({ ...prev, right: true }));
          break;
        case " ":
          setKeys((prev) => ({ ...prev, shoot: true }));
          break;
        case "shift":
          setKeys((prev) => ({ ...prev, shield: true }));
          break;
        case "e":
          setKeys((prev) => ({ ...prev, turbo: true }));
          break;
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      switch (e.key.toLowerCase()) {
        case "w":
        case "arrowup":
          setKeys((prev) => ({ ...prev, forward: false }));
          break;
        case "s":
        case "arrowdown":
          setKeys((prev) => ({ ...prev, backward: false }));
          break;
        case "a":
        case "arrowleft":
          setKeys((prev) => ({ ...prev, left: false }));
          break;
        case "d":
        case "arrowright":
          setKeys((prev) => ({ ...prev, right: false }));
          break;
        case " ":
          setKeys((prev) => ({ ...prev, shoot: false }));
          break;
        case "shift":
          setKeys((prev) => ({ ...prev, shield: false }));
          break;
        case "e":
          setKeys((prev) => ({ ...prev, turbo: false }));
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return { keys };
}
