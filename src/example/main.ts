import "./style.css";
import typescriptLogo from "./typescript.svg";
import viteLogo from "/vite.svg";
import { setupCounter } from "./counter.ts";
import { CursorPositionDetector } from "src";

const targetElement = document.querySelector("body") as Element;

new CursorPositionDetector({
  element: targetElement,
  threshold: 0.3,
  onClickTop: () => console.log("Clicked top"),
  onClickBottom: () => console.log("Clicked bottom"),
  onClickLeft: () => console.log("Clicked left"),
  onClickRight: () => console.log("Clicked right"),
  onEnterTop: () => console.log("Entered top zone"),
  onEnterBottom: () => console.log("Entered bottom zone"),
  onEnterLeft: () => console.log("Entered left zone"),
  onEnterRight: () => console.log("Entered right zone"),
  onLeaveTop: () => console.log("Left top zone"),
  onLeaveBottom: () => console.log("Left bottom zone"),
  onLeaveLeft: () => console.log("Left left zone"),
  onLeaveRight: () => console.log("Left right zone"),
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
