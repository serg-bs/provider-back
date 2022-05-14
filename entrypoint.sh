#! /bin/bash

if [ "$1" = 'provider' ]; then
    node hello.js
fi

exec "$@"
