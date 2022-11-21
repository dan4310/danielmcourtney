#!/bin/bash

docker run -d \
--name danielmcourtney \
-v danielmcourtney-vol:/app/data \
-p 8080:3000 \
--env-file ./.env \
dan4310/danielmcourtney