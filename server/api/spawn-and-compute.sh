#!/bin/sh
sh /home/skeswa/crowdcloud/server/api/spawn.sh $(( ( RANDOM % 20000 )  + 1 ))
for i in `seq 5`; do sh /home/skeswa/crowdcloud/server/api/compute.sh; done
