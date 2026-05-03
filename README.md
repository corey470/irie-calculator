# Irie Calculator

Irie Calculator is a static calculator site for everyday money decisions. It is built as plain HTML, CSS, and JavaScript so agents can understand and change it quickly without a framework build step.

Production site: https://irie-calculator.vercel.app  
GitHub repo: https://github.com/corey470/irie-calculator  
Local workspace: `/Users/irieagent/Documents/Calulators`

## Ownership And Connections

GitHub:
- Owner/repo: `corey470/irie-calculator`
- Default branch: `main`
- Remote: `https://github.com/corey470/irie-calculator.git`
- Visibility: public

Vercel:
- Project name: `irie-calculator`
- Production alias: `https://irie-calculator.vercel.app`
- Latest inspected production deployment status: `Ready`
- Vercel scope shown by CLI: `corey-1860s-projects`
- Project id from `.vercel/project.json`: `prj_36knwgy0pPxG0IggD0sRIiOQtBIa`
- Org id from `.vercel/project.json`: `team_BUfbPxIbyANfrNIYoWhuMg9Z`
- Build behavior: no framework detected, static files served from project root
- Config file: `vercel.json`
- Vercel local metadata folder: `.vercel/` and intentionally ignored by Git

Supabase:
- No Supabase project is connected yet.
- There are no Supabase URLs, anon keys, service keys, database tables, Edge Functions, Auth rules, or Storage buckets in this repo.
- Current calculator state is not persisted to a database. User inputs are saved only through shareable URL query parameters.
- If Supabase is added later, document the project ref, tables, RLS policies, Edge Functions, and environment variables in this README before shipping.

External APIs:
- None currently.
- ZIP defaults are local starter estimates in `app.js`; they are not live tax, gas, rent, or insurance quotes.
- There are no ad network, affiliate, analytics, or tracking scripts currently installed.

## What The Site Does

Primary categories:
- Auto: lease vs finance, lease score, zero-down equivalent, mileage risk, finance payment, estimated equity, and gas cost.
- Home: home payment, rent check, rent vs buy, and move-in cash assumptions.
- Finance: debt payoff, simple loan payment, emergency fund gap.
- Fuel: commute cost, MPG savings, road trip cost.
- Shopping: unit price, grocery budget, eating-in savings, travel/shopping trip total.

The first screen is the Auto calculator. Other categories are separate in-page views controlled by hash routes:
- `/#auto`
- `/#home`
- `/#finance`
- `/#fuel`
- `/#shopping`

The dedicated SEO guide pages are:
- `/lease-vs-finance`
- `/home-calculators`
- `/debt-payoff-calculator`
- `/fuel-cost-calculator`
- `/grocery-budget-calculator`

## File Map

Core app:
- `index.html` contains the main calculator UI, nav, SEO metadata, JSON-LD structured data, and all calculator form fields.
- `styles.css` contains the Irie Calculator visual system, layout, mobile behavior, accessibility/focus states, and responsive rules.
- `app.js` contains all calculator math, page routing, shareable URLs, ZIP defaults, preset loading, and event listeners.

SEO/GEO:
- `llms.txt` summarizes the site for AI answer engines.
- `robots.txt` allows crawling and points to `llms.txt` and `sitemap.xml`.
- `sitemap.xml` lists the production URLs.
- The five topic HTML files are lightweight SEO pages that link back to the main calculator.

Deployment:
- `vercel.json` enables clean URLs and disables trailing slashes.
- `.vercelignore` keeps screenshots, logs, dependencies, and Git metadata out of Vercel uploads.
- `.gitignore` keeps `.vercel/`, screenshots, logs, dependencies, and local system files out of Git.

## Calculator State And Sharing

Inputs are shareable through query parameters. The Share button:
- reads all calculator fields from the DOM,
- writes them into the current URL,
- preserves the current hash route,
- attempts to copy the URL to the clipboard,
- falls back to displaying the URL if clipboard access is blocked.

Example:

```text
https://irie-calculator.vercel.app/?homePrice=222000&zip=90210#home
```

On page load, `app.js` reads query parameters and hydrates matching input fields. This is the only persistence layer right now.

## ZIP Defaults

ZIP defaults are intentionally simple starter estimates. They live in `regionalDefaults` inside `app.js` and are keyed by the first digit of the ZIP code.

They currently update assumptions such as:
- sales tax,
- property tax percent,
- home insurance/HOA estimate,
- rent estimate,
- gas price estimate.

These defaults are educational placeholders. If live local data is added later, connect it through a backend/API and clearly label the data source.

## Math Notes

Auto lease vs finance:
- Lease payment uses capitalized cost, residual value, money factor, term, incentives, down payment, taxes, mileage, and disposition assumptions.
- If the user enters a quoted monthly lease payment, that payment overrides the estimated base lease payment.
- Lease score is monthly lease payment before tax as a percent of MSRP.
- Finance payment uses standard amortization from financed amount, APR, and term.
- Comparison uses the same month window and estimates remaining balance/equity.

Home:
- Home payment estimates principal and interest plus property tax, insurance/HOA, and estimated PMI when the down payment is below 20%.
- Rent check uses income, debts, utilities, and rent to estimate a simple affordability result.
- Rent vs buy compares estimated rent growth against estimated ownership costs over the chosen stay period.

Finance:
- Debt payoff compares a simplified payoff path using listed debts and extra payment.
- Loan payment uses standard amortization.
- Emergency fund compares saved cash against monthly bills times target months.

Fuel and shopping:
- Fuel calculators use miles, MPG, fuel price, commute days, parking/tolls, and trip costs.
- Shopping calculators compare unit price, coupon impact, grocery basket totals, eating-in savings, and trip totals.

All calculators are educational estimates. Users should compare results against official quotes, contracts, disclosures, tax bills, lender docs, insurance quotes, and local costs.

## Local Development

Run the static site locally:

```bash
python3 -m http.server 4173
```

Open:

```text
http://127.0.0.1:4173
```

Useful checks:

```bash
node --check app.js
python3 - <<'PY'
from pathlib import Path
for path in sorted(Path('.').glob('*.html')):
    html = path.read_text()
    assert html.lower().count('<main') == html.lower().count('</main>')
    print(f'{path}: ok')
PY
```

Deploy manually:

```bash
vercel --prod
```

Inspect production:

```bash
vercel inspect https://irie-calculator.vercel.app
```

## Agent Rules For Future Work

Before changing calculator math:
- Preserve plain-English labels for non-expert users.
- Keep advanced terms behind advanced controls when possible.
- Add or update the explanation text when introducing new assumptions.
- Verify shareable URL hydration after adding any new input field.
- Add new field IDs to the correct list in `app.js` so the input is included in calculations and share links.

Before changing SEO/GEO:
- Update `sitemap.xml` when adding dedicated pages.
- Update `llms.txt` when adding a meaningful calculator category or changing the site purpose.
- Keep canonical URLs pointed at the production domain.
- Keep guide pages short, specific, and linked back to the working calculator.

Before adding Supabase:
- Add environment variables through Vercel, not committed files.
- Never commit Supabase service role keys.
- Document the Supabase project ref, schema, tables, RLS policies, and API flow here.
- Prefer read-only public data through safe policies or server-side endpoints.

Before adding ads or affiliates:
- Keep placements labeled and non-blocking.
- Do not add popups, fake urgency, or calculator-gating ads.
- Document the ad/affiliate provider and script location here.

## Current Known Gaps

- No custom domain has been attached yet.
- No Supabase backend exists yet.
- ZIP defaults are not live local data.
- No analytics are installed yet.
- No ad or affiliate network is installed yet.
