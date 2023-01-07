#!/bin/bash

curl https://frankle.onrender.com/api/getallwords |jq . |tail -n 30
