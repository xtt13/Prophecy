#!/usr/bin/env bash
webpack --config webpack.productionApplication.config.js
pwd
cd ../ProphecyDesktopApplication/
pwd
electron-packager . --platform=win32 --overwrite=true