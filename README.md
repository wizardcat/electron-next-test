# Electron + Next.js Test Project
This is a test project that combines Electron with Next.js to create a cross-platform desktop application. It is set up to develop and build a hybrid application where Electron handles the native desktop features, and Next.js manages the front-end.
Next.js is not needed for the task at hand, but I was interested in trying to make a project using it.

P.S. I know about Nextron, but "This is different." (c). :)

Upd. The project build does not work correctly on MacOS. If you need to create build you shall use Windows.
## To do
Fix this bug

## Project Overview
Author: Roman Havrylko
Version: 0.1.0
Description: A test project that integrates Electron with Next.js.
License: Private

## Table of Contents

Getting Started
Project Structure
Available Scripts
Dependencies
Development Workflow
Building the Project

## Getting Started
### Prerequisites
Ensure you have the following software installed:

Node.js (v18 or later)
Yarn
TypeScript (v5 or later)
Installation
Clone the repository and install the dependencies:

`git clone <repository-url>`
`cd electron-next-test`
`yarn install`

## Project Structure
The project is structured as follows:

├── build/            # Compiled Electron code (output directory)
├── main/             # Electron main process source code (TypeScript)
├── out/              # Next.js build output
├── pages/            # Next.js pages
├── public/           # Static assets for Next.js
├── styles/           # Global styles for Next.js
├── electron-builder.yaml  # Electron Builder configuration
├── next.config.js    # Next.js configuration
├── package.json      # Project metadata and dependencies
├── tsconfig.json     # TypeScript configuration
└── README.md         # Project documentation

## Available Scripts
Here are the scripts available for common tasks:

`npm run dev`: Starts the development environment. Runs both Electron and Next.js with hot-reloading.

`npm run build`: Builds the production-ready Next.js and Electron application.

`npm run build:electron`: Compiles Electron and packages the app using Electron Builder.

`npm run build:main`: Compiles the Electron main process TypeScript files.

## Dependencies

### Core Dependencies
axios: Promise-based HTTP client for the browser and Node.js.
electron-log: Simple logging for Electron.
next: The React framework for production.
react: A JavaScript library for building user interfaces.
react-dom: React package for working with the DOM.
uuid: Simple, fast generation of RFC4122 UUIDs.

### Development Dependencies
TypeScript: A strict syntactical superset of JavaScript that adds optional static typing.
Electron: A framework for building cross-platform desktop apps using web technologies.
Electron Builder: A complete solution to package and build Electron apps.
ESLint: A tool for identifying and fixing problems in your JavaScript code.
TailwindCSS: A utility-first CSS framework.
Concurrently: Run multiple npm scripts concurrently.
Wait-On: Wait for files, ports, sockets, or http(s) resources to become available.

## Development Workflow
1. Start Development:

Run the following command to start the development environment:

`yarn dev`

This will start both the Next.js server and the Electron app with hot-reloading enabled.

2. Building the Project:

To build the application for production:

`yarn build`

This will compile the Next.js application, compile the Electron main process, and package the app using Electron Builder.

