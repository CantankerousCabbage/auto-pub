#!/bin/bash

IG_PUBLISHER_JAR=$1
DOWNLOAD_URL=$2

curl -L $DOWNLOAD_URL -o $IG_PUBLISHER_JAR --create-dirs