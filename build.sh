#!/bin/bash

docker image rm mywebsite

docker build . -t mywebsite