# React TypeScript Calculator

A basic web-based calculator application built with React and TypeScript.

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [How to Run](#how-to-run)
- [How to Test](#how-to-test)
- [Environment Variables](#environment-variables)
- [Build](#build)

## Project Overview

This project implements a simple calculator web application with basic arithmetic operations (addition, subtraction, multiplication, division), decimal input, and clear functionality. It's built using React for the UI and TypeScript for type safety and maintainability.

## Features

- **Display Area:** Shows current input and results.
- **Digit Input:** Buttons for digits 0-9.
- **Decimal Input:** Button for a decimal point.
- **Basic Arithmetic:** Addition (+), Subtraction (-), Multiplication (x), Division (/).
- **Equals Functionality:** Calculates and displays the result.
- **Clear Functionality:** Resets the calculator state.
- **Chained Operations:** Supports sequential operations (e.g., `5 + 3 - 2`).
- **Result Reuse:** Uses the previous result as the first operand for the next operation.
- **Division by Zero Handling:** Displays an error message for division by zero.

## Prerequisites

Before you begin, ensure you have the following installed:

-   **Node.js:** Version 18.x or higher (LTS recommended)
-   **npm** (comes with Node.js) or **yarn**

## Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/KhoaPham-dev/react-typescript-calculator.git
    cd react-typescript-calculator
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    # or
    yarn install
    ```

## How to Run

To start the development server:

```bash
npm run dev
# or
yarn dev
```

This will typically open the application in your browser at `http://localhost:5173` (or another available port).

## How to Test

To run the unit tests:

```bash
npm run test
# or
yarn test
```

## Environment Variables

This project currently does not require any specific environment variables. If any were needed in the future, they would be listed in a `.env.example` file.

## Build

To build the application for production:

```bash
npm run build
# or
yarn build
```

This will create a `dist` directory containing the optimized production build of your application.