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
import { CursorPositionDetector, Direction } from "cursor-position-detector";

const targetElement = document.querySelector("body") as Element;

new CursorPositionDetector({
  element: targetElement,
  threshold: 0.3,
  onClick: (direction: Direction) => console.log(`Clicked ${direction}`),
  onEnter: (direction: Direction) => console.log(`Entered ${direction} zone`),
  onLeave: (direction: Direction) => console.log(`Left ${direction} zone`),
});
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
