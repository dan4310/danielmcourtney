#!/bin/bash

docker run -d \
--name mywebsite \
-v mywebsite-vol:/app/data \
-p 8080:3000 \
--env-file ./.env \
mywebsite