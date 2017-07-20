#!/bin/bash

echo "Stopping database container..."
docker-compose stop db

echo "Removing old database files..."
sudo rm -r ./db/data-files

echo "Filling database with new data..."
docker-compose run db /data/preloaded/preload.sh

echo "Running database container..."
docker-compose start db