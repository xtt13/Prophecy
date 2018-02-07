#!/usr/bin/env bash
webpack --config webpack.production.config.js
OUTPUT=$(firebase deploy | xargs)
echo "-------"
slack chat send "Newest Deploylink: $OUTPUT" --channel '#development'