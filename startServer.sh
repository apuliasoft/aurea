#!/bin/bash

export NODE_ENV=production

npm install

forever server.js