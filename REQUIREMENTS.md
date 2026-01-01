# Requirements

## Routes
- `/` (Landing page)
- `/start`
- `/assessment` (multi-step, 5 sections)
- `/results/[id]`
- `/history`

## Data Models
- **Assessment**: stores assessment responses as JSON.
- **RiskResult**: stores score, verdict, drivers (JSON), and translation text.
- **Settings**: key/value app settings.

## Scoring Thresholds + Floors
**Verdict thresholds (locked):**
- 0–24: LOW RISK — CA unlikely to claim you
- 25–49: GRAY ZONE — expect scrutiny
- 50–74: HIGH RISK — CA likely still claims you
- 75–100: VERY LIKELY CA RESIDENT

**Hard constraints (floors):**
- If spouse OR children live in CA → minimum score = 40
- If primary residence is CA → minimum score = 35

## User-Facing Copy (Canonical)
### Hero Section (Above the Fold)
- Headline: Thinking about leaving California for taxes?
- Subhead: Cool. Now find out if California would still tax you anyway.
- Supporting Line: Most people who “leave California” don’t actually leave.
  They move addresses — not their lives.
- Primary CTA: Take the Exit Test →
- Small: Takes ~10 minutes. No signup.

### Social Proof / Credibility (Soft, Not Cringe)
- What this is
- A reality check for high earners
- A myth-killer for bad advice
- A decision test, not a loophole guide

### Problem Section (Aggressive, Truthful)
- Header: The most expensive sentence on the internet:
- Body: California doesn’t care where your mailbox is.
  It cares where your life is.
  If your family, job, home, or habits are still in California,
  California may still consider you a resident — and tax you accordingly.
  This test tells you which side you’re actually on.

### Value Section
- Header: What You’ll Get
- Bullet: A clear verdict: Will this move work or fail?
- Bullet: A residency risk score (no fluff)
- Bullet: The top reasons California would still claim you
- Bullet: The lifestyle tradeoffs nobody talks about

### Who This Is For
- Bullet: $300k–$1M+ earners
- Bullet: People considering NV, TX, or FL
- Bullet: Anyone who wants clarity before blowing up their life

### CTA Section
- Header: Before you move states, test reality.
- CTA: Take the Exit Test →

### Welcome Screen
- Title: Just Move to Vegas?
- Subtitle: Leaving California is easy.
  Escaping California taxes is not.
- Body: This test evaluates whether California would likely still consider you a resident based on your current life setup.
  No advice.
  No loopholes.
  Just clarity.
- CTA: Start the Test →

### Assessment Section Copy
- Section 1 — Family Gravity
  - Title: Where your life is anchored
  - Helper text: Family location is one of the strongest signals California considers.
- Section 2 — Housing Reality
  - Title: Where you actually live
  - Helper text: Owning or occupying a primary home in California creates residency gravity.
- Section 3 — Time & Presence
  - Title: Where you spend your time
  - Helper text: There is no magic day count. Time is evaluated in context.
- Section 4 — Work & Income Anchors
  - Title: Where your money is made
  - Helper text: California pays close attention to where work is performed and income is sourced.
- Section 5 — Signals California Cares About
  - Title: The paper trail
  - Helper text: Licenses, doctors, vehicles, and registrations don’t override lifestyle — but they do reinforce it.

### Results Screen
- Verdict Header (example): Verdict: HIGH RISK — California Likely Still Claims You
- Subheader: You can move your address.
  California still sees your life.
- Risk Score: Residency Risk Score: 78 / 100
- Small: California uses a facts-and-circumstances test. This score reflects relative risk, not certainty.

#### Why This Fails (Top Drivers)
- Primary Drivers
- Your spouse and/or children are based in California
- Your primary residence is still in California
- Your work remains tied to California

#### Plain-English Translation
- If your family and income are still here, California has a strong case that you are too.

#### Tradeoff Reality Check
- Leaving California cleanly usually requires more than paperwork.
- Expect friction around:
  - Schools and childcare
  - Healthcare continuity
  - Travel and time costs
  - Maintaining two lives
  - Ongoing compliance discipline
- This isn’t a tax problem.
  It’s a lifestyle decision.

#### Financial Context (Careful, Still Spicy)
- What this means financially
- If California still considers you a resident, expected tax savings may be zero — while audit risk increases.
- Ranges shown here are illustrative only and depend on individual circumstances.

#### Next Steps (Non-Instructional)
- This test does not tell you what to change.
  It tells you whether your current setup would likely work.
- If this matters to you:
  - Take this summary to a qualified CPA or attorney
  - Decide whether a full lifestyle move is worth it
  - Or abandon the idea and move on — cleanly
- Clarity is a win.

### Disclaimers
- This tool is for educational purposes only.
  It does not provide tax or legal advice.
  It does not guarantee residency or tax outcomes.
  California residency determinations depend on individual facts and circumstances.

### Shareable / Viral One-Liners
- Residency isn’t where you sleep. It’s where your life lives.
- Paperwork doesn’t beat lifestyle.
- Most people don’t leave California — they commute.
- If your kids are in CA, your taxes probably are too.
- Moving states won’t save you if your life didn’t move.

### Scoring Driver Explanations (for UI)
- California treats family location as one of the strongest indicators of residency.
- Owning and using a primary residence in California creates strong residency gravity.
- Where you earn income matters more than where you receive mail.
- Time spent in California reinforces lifestyle patterns.
- Paperwork doesn’t override lifestyle — but it does reinforce it.

### UX Translation
- This score reflects how California would likely view your situation today, not what could be changed.

## Assumptions
- The COPY section does not include explicit labels for the assessment questions. To keep the UI usable while respecting canonical instructions, the product-spec question list is used as the visible labels for inputs.
