#!/bin/sh
sh ./spawn.sh $(( ( RANDOM % 20000 )  + 1 ))
for i in `seq 5`; do sh ./compute.sh; done