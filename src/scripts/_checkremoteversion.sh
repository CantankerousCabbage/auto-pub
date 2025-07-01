#!/bin/bash

TARGET_URL=$1

curl -s $TARGET_URL | jq -r '.[0].name'