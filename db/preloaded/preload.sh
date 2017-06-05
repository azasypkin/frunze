#!/bin/bash

echo "Running MongoDB database."
mongod &
sleep 3

for file_path in /data/preloaded/*.json; do
    echo "Processing $file_path file..."

    file_name=$(basename "$file_path")

    mongoimport --db frunze \
                --collection ${file_name%.*} \
                --drop \
                --file ${file_path} \
                --jsonArray \
                --writeConcern '{w: 1, j: true}'
done
