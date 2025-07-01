#!/bin/bash

IG_PUBLISHER_JAR=$1

# unzip -p "${IG_PUBLISHER_JAR} META-INF/maven/**/pom.properties" | grep -A2 'org.hl7.fhir.publisher.cli'

unzip -p "$IG_PUBLISHER_JAR" 'META-INF/maven/**/pom.properties' | grep -A2 'org.hl7.fhir.publisher.cli'

