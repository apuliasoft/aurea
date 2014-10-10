#!/bin/bash

export NODE_ENV=production
export PORT=8080

npm install

./node_modules/forever/bin/forever server.js