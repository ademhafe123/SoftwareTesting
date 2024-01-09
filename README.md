# Playwright TypeScript Test Automation for WizardPC web application

## Overview

This project is a test automation framework built using Playwright and TypeScript to automate testing for a WizardPC web application. Playwright is a powerful and versatile tool that provides a browser automation API, and TypeScript enhances the development experience by adding static typing to JavaScript.

The primary goal of this project is to demonstrate how Playwright and TypeScript can be combined to create robust and maintainable automated tests for web applications, specifically focusing on a webshop scenario.

## Features

- **Playwright Integration:** Utilizes the Playwright library to interact with web browsers (Chromium, Firefox, and WebKit) for comprehensive test coverage.
- **TypeScript Support:** Written in TypeScript to leverage static typing and enhance code quality.
- **Page Object Model (POM):** Implements the Page Object Model design pattern for better code organization, maintainability, and readability.
- **Sample Webshop Automation:** Provides a set of example test cases to demonstrate how to automate common webshop scenarios such as product selection, checkout, and user registration.

## Getting Started

### Prerequisites

Before running the tests, ensure you have the following installed:

- **Node.js**: [Download and install Node.js](https://nodejs.org/)
-  **Code Editor**: Popular choices include Visual Studio Code, IntelliJ, or any editor of your preference.
-  **Playwright package**: Install npm Playwright package.
### Installation

1. Clone the repository:

   ```terminal
   git clone https://github.com/ademhafe123/SoftwareTesting.git
2. Navigate to the project directory:
   ```terminal
   cd SoftwareTesting
3. Install dependencies:

    ```terminal
   npm install
 ### Running Tests
1. Execute tests:

    ```terminal
   npx playwright test
## Project Structure
The project structure follows a modular approach for better organization:

- **pages/**: Page Object Model classes representing different pages of the webshop. Each is in a folder with its own unique element locators file.
- **tests/**: Test scripts using Playwright to interact with the webshop. Divided into two files: Smoke tests and Regression tests. Additionally it contains Test data and Test Locators.
- **playwrigh.config.ts**: Configuration files for setting up test environment and browser options.
- **package.json**: Contains npm packages that are required to execute tests.
## Successful scenario
In the successful scenario of running tests for the webshop automation project, 
the Playwright TypeScript framework executes a suite of test cases, 
covering critical functionalities such as product selection, checkout, and user authentication. 
As the tests run successfully, Playwright interacts with web browser Chromium, ensuring comprehensive test coverage. 
The use of TypeScript enhances the code quality and maintainability of the automation framework.
Upon completion, the test reports are generated, providing valuable insights into the success of the automated test suite. 
## Example of a successful scenario
**In terminal** 

![In terminal](https://github.com/ademhafe123/SoftwareTesting/assets/154423715/1e9cd8ce-39f2-408e-99c0-4c0a7dfab996)

**Playwright report for smoke tests**

![Playwright report](https://github.com/ademhafe123/SoftwareTesting/assets/154423715/e2428323-97a7-4d98-ac9b-5de0c4bf638e)

**Playwright report for regression tests**

![Playwright report2](https://github.com/ademhafe123/SoftwareTesting/assets/154423715/6b199c03-45a4-4a4f-8808-b9b7eaf3d8cb)

**Playwright UI Mode**

![no error](https://github.com/ademhafe123/SoftwareTesting/assets/154423715/7b95a2cf-4104-4cca-b6e9-11da05541f42)

## Contributing
Contributions are welcome! If you find any issues, have suggestions, or want to add new features.
