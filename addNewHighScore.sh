#!/bin/bash

# Prompt the user for the name
read -rp "Enter the name: " name

# Prompt the user for the time
read -rp "Enter the time: " time

# Prompt the user for the word
read -rp "Enter the word: " word

# Create the JSON object
data=$(cat <<EOF
{
  "name": "$name",
  "time": $time,
  "word": "$word"
}
EOF
)

# Send the POST request with the JSON object
# add this in private file:
curl -X POST -H "Content-Type: application/json" -d "$data" https://frankle.onrender.com/api/addnewhighscore
echo
