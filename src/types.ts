export type CursorPositionDetectorProps = {
  element: Element | null;
  threshold?: number;
  onClick?: (direction: Direction) => void;
  onEnterTop?: () => void;
  onEnterBottom?: () => void;
  onEnterLeft?: () => void;
  onEnterRight?: () => void;
  onLeaveTop?: () => void;
  onLeaveBottom?: () => void;
  onLeaveLeft?: () => void;
  onLeaveRight?: () => void;
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
