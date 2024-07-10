export type CursorPositionDetectorProps = {
  element: Element | null;
  threshold?: number;
  onClick?: (direction: Direction) => void;
  onEnter?: (direction: Direction) => void;
  onLeave?: (direction: Direction) => void;
};

export type CursorPosition = {
  x: number;
  y: number;
};

export type InZone = {
  top: boolean;
  bottom: boolean;
  left: boolean;
  right: boolean;
};

export type Direction = "top" | "bottom" | "left" | "right";
