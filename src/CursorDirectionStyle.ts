import { CursorDirectionStyleProps } from ".";

/**
 * CursorDirectionStyle
 *
 * This class provides functionality to handle mouse events based on the cursor's position relative to an element.
 */
export class CursorDirectionStyle {
  // The HTML element to which the cursor events are attached
  private element: Element | null;
  // The threshold for determining the cursor's position relative to the element
  private threshold: number;
  // Callback functions for click events
  onClickTop?: () => void;
  onClickBottom?: () => void;
  onClickLeft?: () => void;
  onClickRight?: () => void;
  // The current position of the cursor
  cursorPosition: { x: number; y: number };

  constructor({
    element,
    threshold = 0.1,
    onClickTop,
    onClickBottom,
    onClickLeft,
    onClickRight,
  }: CursorDirectionStyleProps) {
    if (!element) {
      throw new Error("Element is required for CursorDirectionStyle.");
    }

    this.element = element;
    this.threshold = threshold;

    // onClick callbacks
    this.onClickTop = onClickTop;
    this.onClickBottom = onClickBottom;
    this.onClickLeft = onClickLeft;
    this.onClickRight = onClickRight;
    this.cursorPosition = { x: 0, y: 0 };

    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseClick = this.handleMouseClick.bind(this);

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

    const distTop = this.cursorPosition.y - boundaries.vertical.prev;
    const distBottom = boundaries.vertical.next - this.cursorPosition.y;
    const distLeft = this.cursorPosition.x - boundaries.horizontal.prev;
    const distRight = boundaries.horizontal.next - this.cursorPosition.x;

    const minDist = Math.min(distTop, distBottom, distLeft, distRight);

    switch (minDist) {
      case distTop:
        newCursor = cursors.top;
        break;
      case distBottom:
        newCursor = cursors.bottom;
        break;
      case distLeft:
        newCursor = cursors.left;
        break;
      case distRight:
        newCursor = cursors.right;
        break;
      default:
        break;
    }

    this.element.style.cursor = newCursor;
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
