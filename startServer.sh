#!/bin/bash
PORT=$1
: ${PORT:=80}

export NODE_ENV=production
export PORT=$PORT

npm install

./node_modules/forever/bin/forever server.js