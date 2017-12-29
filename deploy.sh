#!/usr/bin/env bash
webpack --config webpack.production.config.js
OUTPUT=$(cd deploy && now | xargs)
echo "-------"
slack chat send "Newest Deploylink: $OUTPUT" --channel '#development'