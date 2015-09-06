#!/bin/sh
azure vm create \
  -n "cloudsourcespawn"$1 \
  -z "Basic_A1" \
  --ssh \
  -l "East US" \
  "cloudsourcespawn"$1 \
  "b39f27a8b8c64d52b05eac6a62ebad85__Ubuntu-14_04_3-LTS-amd64-server-20150805-en-us-30GB" \
  "cloudsource" \
  "Cloudsource#12345"