import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { CursorPositionDetector } from "../src";
import { fireEvent, waitFor } from "@testing-library/dom";

describe("CursorPositionDetector", () => {
  let element: HTMLElement;
  let instance: CursorPositionDetector;

  const onClick = vi.fn();
  const onEnter = vi.fn();
  const onLeave = vi.fn();

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
  it("should call onClick when clicking on the top zone", () => {
    instance = new CursorPositionDetector({
      element,
      threshold: 0.5,
      onClick,
    });
    fireEvent.click(element, { clientX: 50, clientY: 10 });

    waitFor(() => {
      expect(onClick).toHaveBeenCalledWith("top");
    });
  });

  it("should call onClick when clicking on the bottom zone", () => {
    instance = new CursorPositionDetector({
      element,
      threshold: 0.5,
      onClick,
    });
    fireEvent.click(element, { clientX: 50, clientY: 90 });

    waitFor(() => {
      expect(onClick).toHaveBeenCalledWith("bottom");
    });
  });

  it("should call onClick when clicking on the left zone", () => {
    instance = new CursorPositionDetector({
      element,
      threshold: 0.5,
      onClick,
    });
    fireEvent.click(element, { clientX: 10, clientY: 50 });

    waitFor(() => {
      expect(onClick).toHaveBeenCalledWith("left");
    });
  });

  it("should call onClick when clicking on the right zone", () => {
    instance = new CursorPositionDetector({
      element,
      threshold: 0.5,
      onClick,
    });
    fireEvent.click(element, { clientX: 90, clientY: 50 });

    waitFor(() => {
      expect(onClick).toHaveBeenCalledWith("right");
    });
  });

  /**
   * onEnter
   */
  it("should call onEnter when entering the top zone", () => {
    instance = new CursorPositionDetector({
      element,
      threshold: 0.5,
      onEnter,
    });
    fireEvent.mouseMove(element, { clientX: 50, clientY: 10 });

    waitFor(() => {
      expect(onEnter).toHaveBeenCalledWith("top");
    });
  });

  it("should call onEnter when entering the bottom zone", () => {
    instance = new CursorPositionDetector({
      element,
      threshold: 0.5,
      onEnter,
    });
    fireEvent.mouseMove(element, { clientX: 50, clientY: 90 });

    waitFor(() => {
      expect(onEnter).toHaveBeenCalledWith("bottom");
    });
  });

  it("should call onEnter when entering the left zone", () => {
    instance = new CursorPositionDetector({
      element,
      threshold: 0.5,
      onEnter,
    });
    fireEvent.mouseMove(element, { clientX: 10, clientY: 50 });

    waitFor(() => {
      expect(onEnter).toHaveBeenCalledWith("left");
    });
  });

  it("should call onEnter when entering the right zone", () => {
    instance = new CursorPositionDetector({
      element,
      threshold: 0.5,
      onEnter,
    });
    fireEvent.mouseMove(element, { clientX: 90, clientY: 50 });

    waitFor(() => {
      expect(onEnter).toHaveBeenCalledWith("right");
    });
  });

  /**
   * onLeave
   */
  it("should call onLeave when leaving the top zone", () => {
    instance = new CursorPositionDetector({
      element,
      threshold: 0.5,
      onEnter,
      onLeave,
    });
    fireEvent.mouseMove(element, { clientX: 50, clientY: 10 });
    fireEvent.mouseMove(element, { clientX: 50, clientY: 60 });

    waitFor(() => {
      expect(onLeave).toHaveBeenCalledWith("top");
    });
  });

  it("should call onLeave when leaving the bottom zone", () => {
    instance = new CursorPositionDetector({
      element,
      threshold: 0.5,
      onEnter,
      onLeave,
    });
    fireEvent.mouseMove(element, { clientX: 50, clientY: 90 });
    fireEvent.mouseMove(element, { clientX: 50, clientY: 60 });

    waitFor(() => {
      expect(onLeave).toHaveBeenCalledWith("bottom");
    });
  });

  it("should call onLeave when leaving the left zone", () => {
    instance = new CursorPositionDetector({
      element,
      threshold: 0.5,
      onEnter,
      onLeave,
    });
    fireEvent.mouseMove(element, { clientX: 10, clientY: 50 });
    fireEvent.mouseMove(element, { clientX: 60, clientY: 50 });

    waitFor(() => {
      expect(onLeave).toHaveBeenCalledWith("left");
    });
  });

  it("should call onLeave when leaving the right zone", () => {
    instance = new CursorPositionDetector({
      element,
      threshold: 0.5,
      onEnter,
      onLeave,
    });
    fireEvent.mouseMove(element, { clientX: 90, clientY: 50 });
    fireEvent.mouseMove(element, { clientX: 60, clientY: 50 });

    waitFor(() => {
      expect(onLeave).toHaveBeenCalledWith("right");
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
