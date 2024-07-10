import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { CursorPositionDetector } from "../src";
import { fireEvent, waitFor } from "@testing-library/dom";

describe("CursorDirectionStyle", () => {
  let element: HTMLElement;
  let instance: CursorPositionDetector;

  beforeEach(() => {
    element = document.createElement("div");
    document.body.appendChild(element);
    instance = new CursorPositionDetector({ element });
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
   * onClick
   */
  it("should call onClickTop when clicking on the top zone", () => {
    const onClickTop = vi.fn();
    instance = new CursorPositionDetector({
      element,
      threshold: 0.5,
      onClickTop,
    });
    fireEvent.click(element, { clientX: 50, clientY: 10 });

    waitFor(() => {
      expect(onClickTop).toHaveBeenCalled();
    });
  });

  it("should call onClickBottom when clicking on the bottom zone", () => {
    const onClickBottom = vi.fn();
    instance = new CursorPositionDetector({
      element,
      threshold: 0.5,
      onClickBottom,
    });
    fireEvent.click(element, { clientX: 50, clientY: 90 });

    waitFor(() => {
      expect(onClickBottom).toHaveBeenCalled();
    });
  });

  it("should call onClickLeft when clicking on the left zone", () => {
    const onClickLeft = vi.fn();
    instance = new CursorPositionDetector({
      element,
      threshold: 0.5,
      onClickLeft,
    });
    fireEvent.click(element, { clientX: 10, clientY: 50 });

    waitFor(() => {
      expect(onClickLeft).toHaveBeenCalled();
    });
  });

  it("should call onClickRight when clicking on the left zone", () => {
    const onClickRight = vi.fn();
    instance = new CursorPositionDetector({
      element,
      threshold: 0.5,
      onClickRight,
    });
    fireEvent.click(element, { clientX: 90, clientY: 50 });

    waitFor(() => {
      expect(onClickRight).toHaveBeenCalled();
    });
  });

  /**
   * onEnter
   */
  it("should call onEnterTop when entering the top zone", () => {
    const onEnterTop = vi.fn();
    instance = new CursorPositionDetector({
      element,
      threshold: 0.5,
      onEnterTop,
    });
    fireEvent.mouseMove(element, { clientX: 50, clientY: 10 });

    waitFor(() => {
      expect(onEnterTop).toHaveBeenCalled();
    });
  });

  it("should call onEnterBottom when entering the bottom zone", () => {
    const onEnterBottom = vi.fn();
    instance = new CursorPositionDetector({
      element,
      threshold: 0.5,
      onEnterBottom,
    });
    fireEvent.mouseMove(element, { clientX: 50, clientY: 90 });

    waitFor(() => {
      expect(onEnterBottom).toHaveBeenCalled();
    });
  });

  it("should call onEnterLeft when entering the left zone", () => {
    const onEnterLeft = vi.fn();
    instance = new CursorPositionDetector({
      element,
      threshold: 0.5,
      onEnterLeft,
    });
    fireEvent.mouseMove(element, { clientX: 10, clientY: 50 });

    waitFor(() => {
      expect(onEnterLeft).toHaveBeenCalled();
    });
  });

  it("should call onEnterRight when entering the right zone", () => {
    const onEnterRight = vi.fn();
    instance = new CursorPositionDetector({
      element,
      threshold: 0.5,
      onEnterRight,
    });
    fireEvent.mouseMove(element, { clientX: 90, clientY: 50 });

    waitFor(() => {
      expect(onEnterRight).toHaveBeenCalled();
    });
  });

  /**
   * onLeave
   */
  it("should call onLeaveTop when leaving the top zone", () => {
    const onLeaveTop = vi.fn();
    instance = new CursorPositionDetector({
      element,
      threshold: 0.5,
      onEnterTop: () => {},
      onLeaveTop,
    });
    fireEvent.mouseMove(element, { clientX: 50, clientY: 10 });
    fireEvent.mouseMove(element, { clientX: 50, clientY: 60 });

    waitFor(() => {
      expect(onLeaveTop).toHaveBeenCalled();
    });
  });

  it("should call onLeaveBottom when leaving the bottom zone", () => {
    const onLeaveBottom = vi.fn();
    instance = new CursorPositionDetector({
      element,
      threshold: 0.5,
      onEnterBottom: () => {},
      onLeaveBottom,
    });
    fireEvent.mouseMove(element, { clientX: 50, clientY: 90 });
    fireEvent.mouseMove(element, { clientX: 50, clientY: 60 });

    waitFor(() => {
      expect(onLeaveBottom).toHaveBeenCalled();
    });
  });

  it("should call onLeaveLeft when leaving the left zone", () => {
    const onLeaveLeft = vi.fn();
    instance = new CursorPositionDetector({
      element,
      threshold: 0.5,
      onEnterLeft: () => {},
      onLeaveLeft,
    });
    fireEvent.mouseMove(element, { clientX: 10, clientY: 50 });
    fireEvent.mouseMove(element, { clientX: 60, clientY: 50 });

    waitFor(() => {
      expect(onLeaveLeft).toHaveBeenCalled();
    });
  });

  it("should call onLeaveRight when leaving the right zone", () => {
    const onLeaveRight = vi.fn();
    instance = new CursorPositionDetector({
      element,
      threshold: 0.5,
      onEnterRight: () => {},
      onLeaveRight,
    });
    fireEvent.mouseMove(element, { clientX: 90, clientY: 50 });
    fireEvent.mouseMove(element, { clientX: 60, clientY: 50 });

    waitFor(() => {
      expect(onLeaveRight).toHaveBeenCalled();
    });
  });

  /**
   * Destroy
   */
  it("should remove event listeners on destroy", () => {
    const spy = vi.spyOn(element, "removeEventListener");
    instance.destroy();
    expect(spy).toHaveBeenCalledWith("mousemove", expect.any(Function));
    expect(spy).toHaveBeenCalledWith("click", expect.any(Function));
  });
});