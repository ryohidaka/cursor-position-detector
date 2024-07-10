import { CursorPositionDetectorProps, Direction } from ".";

/**
 * CursorPositionDetector
 *
 * This class provides functionality to handle mouse events based on the cursor's position relative to an element.
 */
export class CursorPositionDetector {
  // The HTML element to which the cursor events are attached
  private element: Element | null;
  // The threshold for determining the cursor's position relative to the element
  private threshold: number;
  // Callback function for click events
  onClick?: (direction: Direction) => void;
  // Callback function for mouse enter events
  onEnter?: (direction: Direction) => void;
  // Callback function for mouse leave events
  onLeave?: (direction: Direction) => void;
  cursorPosition: { x: number; y: number };
  // Flags indicating whether the cursor is in a specific zone
  private inZone: {
    top: boolean;
    bottom: boolean;
    left: boolean;
    right: boolean;
  };

  constructor({
    element,
    threshold = 0.1,
    onClick,
    onEnter,
    onLeave,
  }: CursorPositionDetectorProps) {
    this.element = element;
    this.threshold = threshold;
    this.onClick = onClick;
    this.onEnter = onEnter;
    this.onLeave = onLeave;
    this.cursorPosition = { x: 0, y: 0 };
    this.inZone = { top: false, bottom: false, left: false, right: false };

    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseClick = this.handleMouseClick.bind(this);

    if (!this.element) {
      console.error("Element is required for CursorPositionDetector.");
      return;
    }

    this.element.addEventListener("mousemove", this.handleMouseMove);
    this.element.addEventListener("click", this.handleMouseClick);
  }

  /**
   * Handles the mouse move event.
   * Updates the cursor position and style based on its position relative to the element.
   */
  private handleMouseMove(event: Event) {
    if (!this.element || !(event instanceof MouseEvent)) return;

    const rect = this.element.getBoundingClientRect();
    this.cursorPosition = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };
    this.updateCursorStyle(rect.width, rect.height);
  }

  /**
   * Handles the mouse click event.
   * Calls the appropriate callback function based on the cursor's position relative to the element.
   */
  private handleMouseClick() {
    if (!this.element) return;

    const rect = this.element.getBoundingClientRect();
    const boundaries = {
      horizontal: {
        prev: rect.width * this.threshold,
        next: rect.width * (1 - this.threshold),
      },
      vertical: {
        prev: rect.height * this.threshold,
        next: rect.height * (1 - this.threshold),
      },
    };

    let direction: Direction | null = null;

    if (this.cursorPosition.y < boundaries.vertical.prev) {
      direction = "top";
    } else if (this.cursorPosition.y > boundaries.vertical.next) {
      direction = "bottom";
    } else if (this.cursorPosition.x < boundaries.horizontal.prev) {
      direction = "left";
    } else if (this.cursorPosition.x > boundaries.horizontal.next) {
      direction = "right";
    }

    if (direction) {
      this.onClick?.(direction);
    }
  }

  private updateCursorStyle(width: number, height: number) {
    if (!this.element || !(this.element instanceof HTMLElement)) return;

    const boundaries = {
      horizontal: {
        prev: width * this.threshold,
        next: width * (1 - this.threshold),
      },
      vertical: {
        prev: height * this.threshold,
        next: height * (1 - this.threshold),
      },
    };

    const cursors = {
      top: "n-resize",
      bottom: "s-resize",
      left: "w-resize",
      right: "e-resize",
      default: "default",
    };

    let newCursor = cursors.default;
    let newInZone = { ...this.inZone };

    const distTop = this.cursorPosition.y - boundaries.vertical.prev;
    const distBottom = boundaries.vertical.next - this.cursorPosition.y;
    const distLeft = this.cursorPosition.x - boundaries.horizontal.prev;
    const distRight = boundaries.horizontal.next - this.cursorPosition.x;

    const minDist = Math.min(distTop, distBottom, distLeft, distRight);

    let direction: Direction | null = null;

    switch (minDist) {
      case distTop:
        newCursor = cursors.top;
        direction = "top";
        break;
      case distBottom:
        newCursor = cursors.bottom;
        direction = "bottom";
        break;
      case distLeft:
        newCursor = cursors.left;
        direction = "left";
        break;
      case distRight:
        newCursor = cursors.right;
        direction = "right";
        break;
    }

    if (direction) {
      if (!this.inZone[direction]) {
        this.onEnter?.(direction);
        newInZone[direction] = true;
      } else {
        this.onLeave?.(direction);
        newInZone[direction] = false;
      }
    }

    this.element.style.cursor = newCursor;
    this.inZone = newInZone;
  }

  /**
   * Removes all event listeners from the element.
   */
  destroy() {
    if (!this.element) return;

    this.element.removeEventListener("mousemove", this.handleMouseMove);
    this.element.removeEventListener("click", this.handleMouseClick);
  }
}
