# Handoff: WelliVerify Mobile App (Multi-Role Prototype)

## Overview
WelliVerify is a pharmaceutical supply-chain trust and verification platform for the Nigerian market (NAFDAC-grounded). This package covers a clickable mobile prototype spanning five user roles — Pharmacist, Patient, Distributor, Regulator, and Laboratory — plus a companion platform-strategy one-pager (API/business model, non-UI).

## About the Design Files
The files in this bundle are **design references built in HTML** (a Design Component runtime, not a framework) — they demonstrate intended layout, copy, states and interaction flow, not production code to copy directly. The task is to **recreate these HTML designs in the target codebase's existing environment** (React Native, Flutter, native iOS/Android, or whatever the team already uses) — or, if no mobile stack exists yet, choose the most appropriate framework and implement there. Do not attempt to ship `WelliVerify - Pharmacist.dc.html` as-is; it depends on a proprietary component runtime (`support.js`) that only exists in the design tool.

## Fidelity
**High-fidelity.** Colors, typography, spacing and copy are final-intent (drawn from the bound "Broadsheet" design system — see Design Tokens below). Layouts, states, and micro-copy should be recreated precisely. Icons are inline SVG (Phosphor-style duotone) — swap for the Phosphor icon library in the real app.

## App structure
Single mobile screen, 390×844 (iPhone-sized) canvas, no OS chrome. Global nav = left drawer (hamburger icon top-left) + back-arrow when inside a subflow. Header bar is fixed height (~52px), shows a small "W" wordmark glyph, screen title, a notifications bell (with badge count), and a role tag (e.g. "PHARMACIST") top-right. Content area scrolls; drawer overlays with a scrim.

Role switching happens two ways: (1) at login, tapping one of 5 role tiles (Pharmacist/Patient/Distributor/Regulator/Laboratory); (2) later, from the Profile screen's "Switch role" radio list. Each role retains its own last-visited screen and navigation stack independently (so switching roles and switching back returns you where you left off).

## Screens / Views

### Shared / cross-role
- **Login** — Wordmark + tagline, 2×2 grid of role tiles (+1 full-width Laboratory tile) with the selected tile filled solid accent, dynamic ID field label (PCN / phone / licence no. / badge no. / lab reg. no.) + password field, a one-line note about what the credential is checked against, primary "Continue" button.
- **Profile** — Identity card (name + meta line), "Switch role" radio group (5 roles), "Sign out" ghost button full-width.
- **Notifications** — Bell icon opens a feed screen; cards list title / meta / severity tag, aggregated per-role from that role's alerts, recalls, reminders, or expiring items. Empty state: "No notifications right now."
- **Report a concern** (generic, used by pharmacist/patient/lab) — Product field (readonly), segmented control for report type (Adverse event / Suspected fake / Quality issue), description textarea, Submit. On submit: success state with "AI triage" card (classified urgency + auto-routing message) and a "Back to dashboard" button.
- **Product Record** — Verified badge, product name + manufacturer, batch/expiry/registration facts card; pharmacist-only: supply-chain status/last-verified/risk row, a 4-step supply-chain journey list, "Supplier profile" + "Risk breakdown" buttons; patient-only: "Safety alerts: none" line + reassurance copy. Both: "AI packaging check" secondary button, "Report a concern" ghost button.
- **Unable to Verify** — Shown when a simulated scan fails: warning tag, explanation copy, "Try again" + "Report anyway" buttons.

### Pharmacist
- **Dashboard** — Greeting + pharmacy name/location, two open (non-card) stat blocks ("Stockout risk: 3 items", "Active recalls: 1 batch") in accent/accent-2 colors, primary "Scan a product" button, 2-up secondary buttons (Inventory / Stockout alerts), "Recent activity" card list, and a "Supply risk alert" card (regional insulin stockout trend).
- **Scan & Verify** — Square camera viewport mock with animated scanline, offline-capable tag, "Start scan" primary button, "Enter code manually" link, "Simulate an unrecognized code" ghost link (routes to Unable to Verify), "Verify by voice instead" link, SMS/WhatsApp fallback copy, "Recently scanned" card.
- **Inventory** — Search input, filter tag row (All / Expiring soon / Low stock), list of product cards (name, qty, batch, days-to-expiry).
- **Stockout Alerts (FEFO)** — Cards ranked by urgency (HIGH/MEDIUM/LOW tag), showing sell velocity and days-to-stockout, "sell this batch first" guidance.
- **Nearby Availability** — Search input, list of pharmacy cards with stock level, distance, area, "verified Xh ago" freshness tag.
- **Recalls & Alerts** — Cards per recall: title, severity tag, status line, required action.
- **Risk Engine** — Two-part breakdown: a "chain-of-custody" card (Manufacturer/Importer/Distributor/Pharmacy/Registration/Expiry — all Confirmed), then a "behavioural signals" card (Movement velocity/Geographic jump/Supplier purchasing pattern/Serial reuse — all Abnormal/Detected), ending in a centered "SUPPLY-CHAIN ANOMALY DETECTED" tag and explanatory copy distinguishing valid documents from suspicious behaviour.
- **Supplier Profile** — Org name/location, verified-status rows (licence/credentials/inspection/documentation), stats card (authorized products, years active, recall/compliance history).
- **Demand Forecast** — Cards per product: trend % (accent tag), confidence %, region, and a plain-language seasonal note.
- **AI Packaging Check** — Side-by-side "reference photo" vs "your photo" placeholders, "Analyze photo" button → result card (font/color/hologram match rows) → verdict tag "PACKAGING MISMATCH DETECTED" (or match) → "Report this product" button.
- **Voice Verify** — Large circular mic button (pulses while "listening"), transcript card + spoken-style verification response card.

### Patient
- **Home** — Greeting, primary "Verify a product" button, secondary "Find nearby stock" button, "Recently verified" card.
- **Verify a Product** — Same scan viewport pattern as pharmacist's Scan screen, simplified (no inventory tie-ins), SMS/WhatsApp fallback, "Simulate an unrecognized code" and "Verify by voice" links.
- **Nearby Availability** — Same list pattern as pharmacist's, each card has a "Reserve & pay" button → Checkout.
- **Checkout** — Order summary card (product/pharmacy/qty/total in Naira), WelliPay explainer line, "Pay with WelliPay" button → success state with a reference code and "Show this code to collect" instruction.
- **My Prescriptions** — List of past fills: product, pharmacy, date, "Collected" status tag.
- **Reminders** — Cards per medication with dose schedule; toggle button "Mark as taken" ⇄ "Taken ✓" (fills accent when done).

### Distributor
- **Dashboard** — Org name/location, two open stat blocks ("Dispatched: 8,412 units / 214 batches", "Trust status: Verified"), 2×2 grid of secondary buttons (Track shipments / Recalls / Alerts / Price intel).
- **Shipments** — Cards: product, status tag (Delivered/In transit), route description.
- **My Trust Profile** — Same verified-status pattern as pharmacist's Supplier Profile, self-view, plus a "Renew documentation" button.
- **Cold Chain** — List of temperature-sensitive shipments with status tag (NORMAL=accent / EXCEPTION=accent-2), tap-through to...
- **Cold Chain Detail** — Horizontal bar-chart timeline of temperature readings (time label / bar height by °C / value), bars turn accent-2 where they exceeded the 2–8°C threshold, legend note.
- **Report an Issue** (distributor variant) — Shipment/batch field (readonly), issue-type segmented control (Diversion/Counterfeit/Documentation), description, submit → same AI-triage success state.
- **Marketplace** — Cards per pharmacy demand order (pharmacy/product/qty/city); each has a stage tag (Pending→Accepted→Dispatched→Delivered) and a "next stage" button that advances it; final stage shows "Settled via WelliPay" tag.
- **Ask WelliVerify** — Free-text input (non-functional placeholder) + list of tappable example questions; tapping one reveals an answer card styled as an AI response.
- **Price Intelligence** — Cards per product with per-city (Abuja/Lagos/Kano) median price; a "Price spike" tag + note appears when one city deviates abnormally.

### Regulator
- **Overview** — Office name/zone, two stat blocks ("Verifications today: 142,880", "Open investigations: 7"), 2×2 grid (Recall dashboard / Alert network / KYB queue / Investigations).
- **Recall Dashboard** — Batch header, a stats card (manufactured/located/dispensed/unknown/recovered/remaining), a recovery progress bar, regulator-only "Broadcast network alert" button.
- **Alert Network** — Same recall-style cards as pharmacist's Recalls screen, regulator gets an "Open recall dashboard" button appended.
- **KYB Queue** — Cards per pending org application (name, type tag, submitted date); Approve/Reject buttons collapse into a status tag once actioned; empty state "queue clear" when all reviewed.
- **Investigations** — Cards per flagged serial (product, status tag, serial, locations, "N linked patient reports"); tapping a card opens the Risk Engine screen for that item.
- **Supply Chain Map** — Cards per region: name, status tag (Normal/Watch/Critical), distributor & pharmacy counts, a one-line note.
- **Reports Inbox** — Cards per incoming report (reporter, type tag, product, time, AI-triage urgency tag); "Mark reviewed" dismisses to a faded row; empty state "inbox clear."
- **Demand Forecast**, **Ask WelliVerify**, **Price Intelligence** — same as distributor's versions, shared render paths.

### Laboratory
- **Dashboard** — Greeting + lab name/location, two stat blocks ("Expiring reagents: 2 items", "Consumables tracked: 4"), buttons to Consumables and Report an issue.
- **Consumables** — List of reagents/kits with qty and days-to-expiry (same card pattern as pharmacist Inventory).

## Interactions & Behavior
- **Scan flow**: tapping "Start scan" sets a scanning state (animated scanline, ~1.4s simulated delay via `setTimeout`), then routes to Product Record (or, via the "simulate unrecognized code" control, to Unable to Verify).
- **Voice flow**: tapping the mic sets "listening" (pulse animation), after ~1.6s shows a canned transcript + AI response.
- **Navigation stack**: forward navigation (`go`) pushes onto a per-role stack; the back arrow pops it; drawer/tab navigation (`navTo`) resets the stack to a single root screen. This is what makes the back button work correctly from deep sub-screens (e.g. Risk Engine reached from Investigations).
- **Report submission**: any report form, on submit, shows a persistent "received" confirmation with an AI-triage summary card; does not auto-return.
- **KYB approve/reject, report dismiss, reminder toggle, marketplace stage-advance**: all are local optimistic state changes (no real backend call in the prototype) — each item tracks its own state by index so multiple items can be actioned independently.
- **Notifications badge**: count is derived per-role from that role's live alert/recall/reminder/expiry lists — it is NOT a separate data model, just a computed aggregate.
- Standard mobile touch targets throughout (44px+ buttons); all interactive elements have hover/active affordances inherited from the design system's button/tag classes.

## State Management
Minimal state per role, keyed by role so switching roles preserves context:
- `screens: { [role]: currentScreenId }`
- `stacks: { [role]: [screenId, ...] }` — navigation history for back button
- `role`, `loginRole` (role selector before auth), `loggedIn`
- `drawerOpen`, `scanState` (idle/scanning), `voiceState` (idle/listening/done)
- `reportSubmitted`, `paySuccess`, `photocheckDone`
- Per-item optimistic state maps: `dismissedReports[]`, `kybStatus{idx: 'Approved'|'Rejected'}`, `remindersTaken{idx: bool}`, `marketFulfilled{idx: stageNumber}`
- `selectedColdChain` (idx of cold-chain item being drilled into)
- `assistantAnswerIdx` (which example question's answer is shown)

No real backend — all lists (inventory, recalls, shipments, forecast data, price rows, KYB queue, investigations, reports inbox, cold-chain readings, regions, prescriptions, reminders, marketplace orders, lab consumables) are static in-memory arrays acting as mock data. A real implementation should back these with actual API calls per the `WelliVerify - Platform Strategy` document's proposed endpoints (`POST /products/verify`, `GET /inventory/{product}`, `GET /suppliers/{id}`, `POST /recalls`, `POST /supply-chain/events`).

## Design Tokens
Pulled from the bound **Broadsheet** design system (`_ds/broadsheet-.../styles.css` — copy that file too, or port the variables below):
- **Background**: `--color-bg` #f3f2f2 (paper white); text `--color-text` near-black
- **Accents**: `--color-accent` #0088b0 (cyan, primary/interactive) and `--color-accent-2` #d6006c (magenta, alerts/warnings/high-urgency) — each with a 100–900 tonal ramp (light steps for tints, 700-900 for text-on-tint)
- **Neutral ramp**: `--color-neutral-100..900` for surfaces/dividers/disabled states
- **Typography**: Source Serif 4 for both headings (`--font-heading`) and body (`--font-body`) — no sans-serif anywhere; italic used for emphasis, never synthesized oblique
- **Radius**: `--radius-sm/md/lg` (2px base, 1.25× density scale)
- **Shadow**: `--shadow-sm/md/lg` for elevated cards (`.elev-sm/md/lg`)
- **Spacing**: consistent 1.25× density scale (`--space-*`) — generous whitespace, no dividing rules between sections (this system deliberately avoids borders/boxes except for `.card`)
- **Components used**: `.btn` (`btn-primary`/`btn-secondary`/`btn-ghost`/`btn-icon`/`btn-block`), `.tag` (`tag-accent`/`tag-accent-2`/`tag-neutral`/`tag-outline`), `.card` (`card-kicker`/`card-title`/`card-body`/`card-meta` + `elev-sm/md/lg`), `.field`/`.input`/`.radio`/`.seg`+`.seg-opt`

Full token values and component markup: see the copied `_ds_broadsheet/` folder in this bundle (styles.css has the `:root` variables; `components/*.html` show real markup for each class).

## Assets
No photographic assets — all icons are inline SVG (Phosphor-style duotone weight; recreate using the actual Phosphor icon library, duotone variant, in the target app). No logos beyond a text "W" monogram + "WelliVerify" wordmark (Source Serif 4, weight 600).

## Files
- `WelliVerify - Pharmacist.dc.html` — the full interactive prototype (all 5 roles, ~40 screens). Despite the filename, it now covers Pharmacist, Patient, Distributor, Regulator and Laboratory.
- `WelliVerify - Platform Strategy.dc.html` — companion one-pager: API design, data architecture, product modules, moat, and business model (not a UI screen — reference for backend/business planning).
- `_ds_broadsheet/` — the design system's token stylesheet and component reference pages, for exact colors/type/spacing/markup.

Open the `.dc.html` files directly in a browser to interact with the live prototype before starting implementation.
