#!/bin/bash

rm -rf node_modules/sui-externs
rm -rf package-lock.json
npm install
npm outdated

./compiler.sh
npx gulp
npx gulp serve
