#!/bin/sh
set -eu

cd /opt/baibakovkir-portfolio
release_file=.release.env
previous_file=.release.env.previous
next_file=.release.env.next

if [ -f "$release_file" ]; then
  cp "$release_file" "$previous_file"
fi

printf 'IMAGE_REPOSITORY=%s\nIMAGE_TAG=%s\n' "$IMAGE_REPOSITORY" "$IMAGE_TAG" > "$next_file"
docker compose --env-file "$next_file" -f compose.prod.yml config --quiet
DOCKER_CONFIG=${DOCKER_CONFIG:?DOCKER_CONFIG is required} docker compose --env-file "$next_file" -f compose.prod.yml pull
mv "$next_file" "$release_file"

deployed=true
docker compose --env-file "$release_file" -f compose.prod.yml up -d --remove-orphans || deployed=false

attempt=0
while [ "$deployed" = true ] && [ "$attempt" -lt 18 ]; do
  if curl --fail --silent --show-error http://127.0.0.1:13001/ >/dev/null; then
    break
  fi
  attempt=$((attempt + 1))
  sleep 5
done
if [ "$attempt" -ge 18 ]; then deployed=false; fi
if [ "$deployed" = true ] && ! curl --fail --silent --show-error --max-time 15 https://baibakovkir.space/ >/dev/null; then
  deployed=false
fi

if [ "$deployed" != true ]; then
  if [ -f "$previous_file" ]; then
    cp "$previous_file" "$release_file"
    docker compose --env-file "$release_file" -f compose.prod.yml up -d --remove-orphans
  else
    docker compose --env-file "$release_file" -f compose.prod.yml down
  fi
  exit 1
fi

rm -f "$previous_file"
DOCKER_CONFIG=${DOCKER_CONFIG:?DOCKER_CONFIG is required} docker logout ghcr.io >/dev/null 2>&1 || true
