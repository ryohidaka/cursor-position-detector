import { CursorPositionDetectorProps } from ".";

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
  // Callback functions for click events
  onClickTop?: () => void;
  onClickBottom?: () => void;
  onClickLeft?: () => void;
  onClickRight?: () => void;
  // Callback functions for mouse enter events
  onEnterTop?: () => void;
  onEnterBottom?: () => void;
  onEnterLeft?: () => void;
  onEnterRight?: () => void;
  // Callback functions for mouse leave events
  onLeaveTop?: () => void;
  onLeaveBottom?: () => void;
  onLeaveLeft?: () => void;
  onLeaveRight?: () => void;
  // The current position of the cursor
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
    onClickTop,
    onClickBottom,
    onClickLeft,
    onClickRight,
    onEnterTop,
    onEnterBottom,
    onEnterLeft,
    onEnterRight,
    onLeaveTop,
    onLeaveBottom,
    onLeaveLeft,
    onLeaveRight,
  }: CursorPositionDetectorProps) {
    this.element = element;
    this.threshold = threshold;

    // onClick callbacks
    this.onClickTop = onClickTop;
    this.onClickBottom = onClickBottom;
    this.onClickLeft = onClickLeft;
    this.onClickRight = onClickRight;

    // onEnter callbacks
    this.onEnterTop = onEnterTop;
    this.onEnterBottom = onEnterBottom;
    this.onEnterLeft = onEnterLeft;
    this.onEnterRight = onEnterRight;

    // onLeave callbacks
    this.onLeaveTop = onLeaveTop;
    this.onLeaveBottom = onLeaveBottom;
    this.onLeaveLeft = onLeaveLeft;
    this.onLeaveRight = onLeaveRight;

    this.cursorPosition = { x: 0, y: 0 };
    this.inZone = { top: false, bottom: false, left: false, right: false };

    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseClick = this.handleMouseClick.bind(this);

    if (!this.element) {
      console.error("Element is required for CursorDirectionStyle.");
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

    if (this.cursorPosition.y < boundaries.vertical.prev) {
      this.onClickTop?.();
      return;
    }

    if (this.cursorPosition.y > boundaries.vertical.next) {
      this.onClickBottom?.();
      return;
    }

    if (this.cursorPosition.x < boundaries.horizontal.prev) {
      this.onClickLeft?.();
      return;
    }

    if (this.cursorPosition.x > boundaries.horizontal.next) {
      this.onClickRight?.();
      return;
    }
  }

  /**
   * Updates the cursor style based on its position relative to the element.
   * Calls the appropriate callback functions for mouse enter and leave events.
   */
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

    switch (minDist) {
      case distTop:
        newCursor = cursors.top;
        if (!this.inZone.top) {
          this.onEnterTop?.();
          newInZone.top = true;
        } else {
          this.onLeaveTop?.();
          newInZone.top = false;
        }
        break;
      case distBottom:
        newCursor = cursors.bottom;
        if (!this.inZone.bottom) {
          this.onEnterBottom?.();
          newInZone.bottom = true;
        } else {
          this.onLeaveBottom?.();
          newInZone.bottom = false;
        }
        break;
      case distLeft:
        newCursor = cursors.left;
        if (!this.inZone.left) {
          this.onEnterLeft?.();
          newInZone.left = true;
        } else {
          this.onLeaveLeft?.();
          newInZone.left = false;
        }
        break;
      case distRight:
        newCursor = cursors.right;
        if (!this.inZone.right) {
          this.onEnterRight?.();
          newInZone.right = true;
        } else {
          this.onLeaveRight?.();
          newInZone.right = false;
        }
        break;
      default:
        if (this.inZone.top) {
          this.onLeaveTop?.();
          newInZone.top = false;
        }
        if (this.inZone.bottom) {
          this.onLeaveBottom?.();
          newInZone.bottom = false;
        }
        if (this.inZone.left) {
          this.onLeaveLeft?.();
          newInZone.left = false;
        }
        if (this.inZone.right) {
          this.onLeaveRight?.();
          newInZone.right = false;
        }
        break;
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
