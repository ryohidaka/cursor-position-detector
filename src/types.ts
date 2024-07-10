export type CursorDirectionStyleProps = {
  element: Element;
  threshold?: number;
  onClickTop?: () => void;
  onClickBottom?: () => void;
  onClickLeft?: () => void;
  onClickRight?: () => void;
};

export type CursorPosition = {
  x: number;
  y: number;
};
