import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { CursorDirectionStyle } from "../src";
import { fireEvent } from "@testing-library/dom";

describe("CursorDirectionStyle", () => {
  let element: HTMLElement;
  let instance: CursorDirectionStyle;

  beforeEach(() => {
    element = document.createElement("div");
    document.body.appendChild(element);
    instance = new CursorDirectionStyle({ element });
  });

  afterEach(() => {
    instance.destroy();
    document.body.removeChild(element);
  });

  it("should update cursor position on mouse move", () => {
    fireEvent.mouseMove(element, { clientX: 10, clientY: 20 });
    expect(instance.cursorPosition).toEqual({ x: 10, y: 20 });
  });

  /**
   * Destroy
   */
  it("should remove event listeners on destroy", () => {
    const spy = vi.spyOn(element, "removeEventListener");
    instance.destroy();
    expect(spy).toHaveBeenCalledWith("mousemove", expect.any(Function));
  });
});
