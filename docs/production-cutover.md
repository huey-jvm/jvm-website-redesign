# GitHub Pages production cutover

Prepared 2026-11-14. DNS and the Pages custom-domain binding remain unchanged during preparation.

## Publication modes

- Normal pushes publish the existing GitHub preview with its repository path and noindex.
- Actions > GitHub Pages > Run workflow > `production-check` builds the root-domain version and uploads an artifact, without deploying it.
- At cutover, set the Pages custom domain to `www.jvmsolutions.net`, then set repository Actions variable `PAGES_PRODUCTION=true` and dispatch `production`.
- Production publishing refuses to run unless the Pages domain is exactly `www.jvmsolutions.net`.
- Future pushes use production mode while that variable is true. To restore preview mode, remove the custom-domain binding, delete the variable and dispatch `preview`.

Static export is independent of the base path. Production uses an empty base path, indexable pages and `https://www.jvmsolutions.net` for canonical/sitemap URLs. Postbuild adds redirect documents for the known old Wix URLs; these use browser redirects, not HTTP 301 responses. New legacy URLs discovered in the old sitemap should be added to `content/legacy-redirects.json` before launch.

## Contact delivery

GitHub Pages cannot execute the Next.js API. The static site displays direct email links to the existing business-development, general and credentialing inboxes, and a phone link. It does not collect a message or claim one was delivered. The server version retains the existing form. An on-site submission form requires a separately configured external backend and delivery testing.

## Next steps, before changing nameservers

1. In the huey-jvm account Settings > Pages, start verifying `jvmsolutions.net`. Capture the exact TXT name/value GitHub provides. Adding that TXT record is a DNS change, so wait for the user's next authorization.
2. Keep the full current Wix zone inventory as the source for email and other records. Microsoft 365 uses MX, SPF, DKIM, DMARC, autodiscover and additional enrollment/SIP records. Preserve their exact values.
3. GoDaddy currently refuses DNS editing while Wix nameservers are active. Confirm a way to stage/import the complete zone before switching, or use a DNS provider that permits pre-staging. Do not switch nameservers into an empty zone. GoDaddy registration does not require GoDaddy DNS.
4. Review the build-only production artifact and confirm the direct-email contact experience is acceptable before cutover.

## Cutover (requires a separate go-ahead)

1. Verify domain ownership with GitHub using the supplied TXT record and retain it.
2. Prepare the replacement DNS zone, including all email and verification records, and arrange the nameserver switch if moving DNS off Wix. DNS hosting and website hosting are separate changes.
3. Bind `www.jvmsolutions.net` in repository Settings > Pages before pointing website DNS at GitHub. This redirects the github.io preview to the domain; schedule it with publication.
4. Publish production as described above, and change only the planned website DNS records: apex A values `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`; `www` CNAME `huey-jvm.github.io`. Review conflicting web A/AAAA/CNAME records. Do not change mail records.
5. Wait for GitHub's domain checks and TLS provisioning, enable Enforce HTTPS when available. Test apex and www, routes, assets, PDFs, old URLs, email links and real Microsoft 365 inbound/outbound email.
6. Keep Wix and the original zone inventory until the new website and email are verified and the rollback window is over. Review Wix Forms/Hotels/Invoices usage before canceling Wix services.

References: [GitHub custom domains](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site), [domain verification](https://docs.github.com/en/pages/configuring-a-custom-domain-for-github-pages-site/verifying-your-custom-domain-for-github-pages), [Wix DNS management](https://support.wix.com/en/article/managing-dns-records-in-your-wix-account).
