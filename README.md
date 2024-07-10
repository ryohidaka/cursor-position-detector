# cursor-position-detector

[![npm version](https://badge.fury.io/js/cursor-position-detector.svg)](https://badge.fury.io/js/cursor-position-detector)
![build](https://github.com/ryohidaka/cursor-position-detector/workflows/Build/badge.svg)
[![codecov](https://codecov.io/gh/ryohidaka/cursor-position-detector/graph/badge.svg?token=RHP9TB2F51)](https://codecov.io/gh/ryohidaka/cursor-position-detector)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT)

## Overview

Detect cursor position and switch cursor style.

## Installation

You can install this library using npm:

```shell
npm install cursor-position-detector
```

## Usage

```ts
const targetElement = document.querySelector("body") as Element;

new CursorDirectionStyle({
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
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
