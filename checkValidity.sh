#!/bin/bash

# Check if a word was provided as an argument
if [ $# -lt 1 ]; then
  echo "Please provide a word as an argument"
  exit 1
fi

word=$1

# Make the word uppercase
uppercase_word=$(echo "$word" | tr '[:lower:]' '[:upper:]')

# Run the curl command
curl -X POST -H "Content-Type: application/json" -d "{\"guess\": \"$uppercase_word\"}" https://frankle.onrender.com/api/checkvalidity/  

echo