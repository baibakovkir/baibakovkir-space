# baibakovkir portfolio

Bilingual portfolio site built with Next.js, React Three Fiber, and Three.js. The homepage includes an interactive portrait scene, project cards, a technology map, and a high-level asynchronous processing case study in Russian and English.

## Run locally

Requires Node.js 24.

```sh
corepack enable
yarn
yarn dev
```

The site opens at `http://localhost:3000`. Use the RU / EN control in the header to switch languages; the preference is saved in the browser.

## Validate

```sh
yarn lint
yarn test
yarn build
```

## GitHub Actions deployment

Pushes to `main` run checks, publish an immutable image to GHCR, then deploy over SSH. Configure these secrets in the GitHub `production` environment:

- `VM_HOST` — VPS address
- `VM_USER` — SSH login user
- `VM_SSH_KEY` — private key contents for the deployment key (for example, the contents of `id_rsa`)
- `VM_KNOWN_HOSTS` — pinned SSH host key entry for the VPS
- `VM_PORT` — optional SSH port; defaults to `22`

The VPS needs Docker with the Compose plugin, Nginx, Certbot with its Nginx plugin, Docker access for the SSH user, and passwordless sudo to install the site vhost and request a certificate. The `baibakovkir.space` DNS A record must point to the VPS, with ports 80 and 443 reachable. The first deploy creates the Nginx route and obtains a Let's Encrypt certificate. The workflow connects to GHCR using its short-lived `GITHUB_TOKEN`; no registry credential is stored on the VPS.

The container listens only on `127.0.0.1:13001`; Nginx serves the public HTTPS endpoint. Deploys use commit SHA image tags, verify the local route and public HTTPS URL, and restore the previous release if verification fails.
