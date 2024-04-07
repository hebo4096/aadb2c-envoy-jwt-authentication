#!/bin/bash
set -e

if [ ! -n "$TOKEN_GENERIC_SECRET" ]; then
  echo "TOKEN_GENERIC_SECRET is missing in .env file"
  exit 1
fi

if [ ! -n "$ENVOY_LISTENER_PORT" ]; then
  echo "ENVOY_LISTENER_PORT is missing in .env file"
  exit 1
fi

if [ ! -n "$ENVOY_SIGNIN_PORT" ]; then
  echo "ENVOY_SIGNIN_PORT is missing in .env file"
  exit 1
fi

if [ ! -n "$AADB2C_HOST" ]; then
  echo "AADB2C_HOST is missing in .env file"
  exit 1
fi

if [ ! -n "$AADB2C_TOKEN_ISSUER" ]; then
  echo "AADB2C_TOKEN_ISSUER is missing in .env file"
  exit 1
fi

if [ ! -n "$AADB2C_APPLICATION_CLIENT_ID" ]; then
  echo "AADB2C_APPLICATION_CLIENT_ID is missing in .env file"
  exit 1
fi

if [ ! -n "$AADB2C_JWKS_ENDPOINT_URI" ]; then
  echo "AADB2C_JWKS_ENDPOINT_URI is missing in .env file"
  exit 1
fi

if [ ! -n "$AADB2C_TOKEN_ENDPOINT_URI" ]; then
  echo "AADB2C_TOKEN_ENDPOINT_URI is missing in .env file"
  exit 1
fi

if [ ! -n "$AADB2C_AUTHORIZE_ENDPOINT_URI" ]; then
  echo "AADB2C_AUTHORIZE_ENDPOINT_URI is missing in .env file"
  exit 1
fi

if [ ! -n "$AADB2C_CALLBACK_URL" ]; then
  echo "AADB2C_CALLBACK_URL is missing in .env file"
  exit 1
fi

eval "echo \"$(cat ./config/front-envoy.yaml.tmpl)\"" > /etc/front-envoy.yaml

/usr/local/bin/envoy -c /etc/front-envoy.yaml --log-level ${ENVOY_DEBUG_LEVEL}

exec "$@"
