#!/bin/bash

docker run -d \
--name mywebsite \
-v mywebsite-vol:/app \
-p 8080:3000 \
mywebsite