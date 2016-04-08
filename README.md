#Solitaire with Angular#

[![Build Status](https://travis-ci.org/jochakovsky/solitaire.svg?branch=master)](https://travis-ci.org/jochakovsky/solitaire)

[Play Solitaire here!](http://jochakovsky.github.io/solitaire/)

This is my attempt to create a Klondike Solitaire clone using Angular. At the moment, the game mechanics are working, but there are some significant styling and behavior improvements that should be made. Please take a look at the open issues, and if you experience a bug or have any suggestions that are not listed, feel free to open an issue.

## Pre-requisites

-   Node.js
-   Ruby with Bundler

## Installation

After cloning the repository and navigating to the project root, run ```npm install``` to install all required dependencies and build the project. To start up a basic web server on port 8000, run ```npm start```.

## Development

After cloning and installing, you can use the included Gulp setup. Just run ```npm run-script tdd``` and Gulp will watch all relevant files for changes. When it detects a change, it will re-build the project, lint the Javascript files, and run all unit tests.

## Deployment

When changes are pushed to the master branch, Travis CI will build the project. If all tests pass, it will deploy the project to the ```gh-pages``` branch.
