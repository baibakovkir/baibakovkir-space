#!/bin/sh
set -eu

deploy_dir=/opt/baibakovkir-portfolio
site_conf=/etc/nginx/sites-available/baibakovkir.space
site_link=/etc/nginx/sites-enabled/baibakovkir.space

if [ "$(id -u)" -eq 0 ]; then
  sudo_cmd=
else
  sudo_cmd=sudo
fi
deploy_user=${SUDO_USER:-$(id -un)}
deploy_group=$(id -gn "$deploy_user")

if ! command -v nginx >/dev/null 2>&1 || ! command -v certbot >/dev/null 2>&1; then
  echo "Nginx and Certbot must be installed on the VPS before the first deployment." >&2
  exit 1
fi

$sudo_cmd install -d -m 755 "$deploy_dir"
$sudo_cmd chown -R "$deploy_user:$deploy_group" "$deploy_dir"

if [ ! -e "$site_link" ]; then
  $sudo_cmd install -d -m 755 /etc/nginx/sites-available /etc/nginx/sites-enabled
  $sudo_cmd install -m 644 "$deploy_dir/nginx-site.conf" "$site_conf"
  $sudo_cmd ln -s "$site_conf" "$site_link"
  $sudo_cmd nginx -t
  $sudo_cmd systemctl reload nginx
fi

if [ ! -s /etc/letsencrypt/live/baibakovkir.space/fullchain.pem ]; then
  $sudo_cmd certbot --nginx --non-interactive --agree-tos --register-unsafely-without-email --redirect -d baibakovkir.space
fi
