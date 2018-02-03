#!/usr/bin/env bash
webpack --config webpack.productionApplication.config.js
pwd
cd ../ProphecyDesktopApplication/
pwd
electron-packager . --icon=icon/icon.icns --overwrite