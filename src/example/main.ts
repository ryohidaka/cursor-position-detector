import "./style.css";
import typescriptLogo from "./typescript.svg";
import viteLogo from "/vite.svg";
import { setupCounter } from "./counter.ts";
import { CursorPositionDetector, Direction } from "src";

const targetElement = document.querySelector("body") as Element;

new CursorPositionDetector({
  element: targetElement,
  threshold: 0.3,
  disabledDirections: ["bottom"],
  onClick: (direction: Direction) => console.log(`Clicked ${direction}`),
  onEnter: (direction: Direction) => console.log(`Entered ${direction} zone`),
  onLeave: (direction: Direction) => console.log(`Left ${direction} zone`),
});

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://www.typescriptlang.org/" target="_blank">
      <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
    </a>
    <h1>Vite + TypeScript</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Click on the Vite and TypeScript logos to learn more
    </p>
  </div>
`;

setupCounter(document.querySelector<HTMLButtonElement>("#counter")!);
