#!/bin/bash

export NODE_ENV=production
export PORT=80

npm install

./node_modules/forever/bin/forever server.js