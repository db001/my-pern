#!/bin/bash

source ./config.sh
export PGPASSWORD=$PGPASSWORD

echo "Configuring db"

dropdb -U postgres mypern
createdb -U postgres mypern

psql -U postgres mypern < ./database.sql

echo "db configured"