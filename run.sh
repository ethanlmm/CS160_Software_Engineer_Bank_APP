#!/bin/bash
node ./api/api.js &
P1=$!
node ./frontend-server/frontend.js &
P2=$!
(cd ./backend && javac -cp .:json.jar:mysql.jar Bank.java && java -cp .:json.jar:mysql.jar Bank) &
P3=$!
wait $P1 $P2 $P3

