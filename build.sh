#!/bin/bash -e
npm install --legacy-peer-deps
npm run build && npm test
