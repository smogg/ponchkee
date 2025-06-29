# MVP Specification – Ponchkee Lead‑Qualification Funnels (Detailing – PL)

*Version 0.1, aimed at first 10 paying users*

---

## 0. Scope Goal

Deliver an end‑to‑end system that:

1. **Captures** WhatsApp inquiries through a guided Q\&A.
2. **Qualifies** each lead with four mandatory data points (service, car model, location, budget band).
3. **Notifies** the owner instantly with a clean summary.
4. **Enables** the owner to reply or mark status without switching apps.
5. **Optionally re‑engages** silent leads after 48 h using WhatsApp templates.

No calendar booking, no payment processing, no Messenger adapter in 0.1.

---

## 1. Epics → Feature Sets → User Stories

### EPIC 1 – Phone Number Provisioning

| ID   | User Story                                                                                                   | Acceptance Criteria                                                                                                                                              |
| ---- | ------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| NP‑1 | *As an owner* I click **“Get my Ponchkee number”** and receive a dedicated Polish WhatsApp number in < 60 s. | — Twilio API purchases mobile PL number.<br>— Phone ID activated in Cloud API.<br>— UI displays: number, `wa.me/NUMBER?text=Hi`, downloadable QR (png, 512×512). |
| NP‑2 | *As internal Admin* I see phone‑inventory status (< 5 numbers triggers auto‑purchase).                       | — Background job checks Twilio balance & inventory hourly.<br>— Purchase logged to `numbers` table with `status=active`.                                         |

### EPIC 2 – Funnel Template Builder

| ID   | User Story                                                               | Acceptance Criteria                                                                           |
| ---- | ------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------- |
| FT‑1 | *As an owner* I can select **“Detailing Quick Quote”** template.         | — Dropdown shows at least one template.<br>— On select, 4 default questions load into editor. |
| FT‑2 | *As an owner* I edit question text & button labels (max 4 options each). | — Inline edits autosave to `funnels` JSON.<br>— Live phone‑style preview updates in < 300 ms. |

### EPIC 3 – Customer Intake Flow (WhatsApp)

| ID   | User Story                                                                    | Acceptance Criteria                                                                              |
| ---- | ----------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| CF‑1 | *As a customer* I tap the link and am greeted by Q1 with quick‑reply buttons. | — Webhook receives inbound `messages`.<br>— Bot replies inside the same session (≤ 2 s latency). |
| CF‑2 | *As system* I must store every answer keyed by `lead_id`.                     | — Create `leads` row on first message.<br>— Append each answer as `{ q_id, value, ts }`.         |
| CF‑3 | *If customer free‑types* I still accept and mark `input_type=text`.           | — Bot proceeds to next step.<br>— Free‑text stored verbatim.                                     |

### EPIC 4 – Price‑Band Calculation (v0.1 light)

| ID   | User Story                                                                                        | Acceptance Criteria                                                                                    |
| ---- | ------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| PB‑1 | *As system* after collecting required fields I compute a **price range** (min–max) via rules CSV. | — Service×car\_size×location matrix resides in config.<br>— Range inserted into summary sent to owner. |
| PB‑2 | *As owner* I can adjust base matrix via simple table UI.                                          | — Edits persisted; next leads use new ranges.                                                          |

### EPIC 5 – Owner Notification & Response

| ID   | User Story                                                                                               | Acceptance Criteria                                        |
| ---- | -------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| NT‑1 | *As owner* I receive a WhatsApp message **from my funnel number** containing lead summary & price range. | — Format: “🚗 BMW 3, Kraków, Pakiet Premium ➜ 350‑450 zł”. |
| NT‑2 | *As owner* I also get the same summary by email.                                                         | — SMTP send within 5 s; retries logged.                    |
| NT‑3 | *As owner* I can click **“Reply via Dashboard”** button to open Ponchkee chat UI (future).               | — Placeholder opens lead detail page.                      |

### EPIC 6 – Lead Dashboard & Status

| ID   | User Story                                                                | Acceptance Criteria                                  |
| ---- | ------------------------------------------------------------------------- | ---------------------------------------------------- |
| LD‑1 | *As owner* I see table columns: Date, Phone, Car, Service, Range, Status. | — Default sort = newest.                             |
| LD‑2 | *I can change Status* to Contacted / Closed.                              | — Dropdown autosaves; badge color updates.           |
| LD‑3 | *I can export CSV* anytime.                                               | — UTF‑8 file with all leads & statuses downloadable. |

### EPIC 7 – Reminder Engine (48 h follow‑up)

| ID   | User Story                                                       | Acceptance Criteria                                                        |
| ---- | ---------------------------------------------------------------- | -------------------------------------------------------------------------- |
| RE‑1 | *As owner* I toggle “Send 48 h reminder”.                        | — Toggle stored per funnel.                                                |
| RE‑2 | *As system* if 48 h passes & status=New, send approved template. | — Template name stored in env.<br>— Conversation cost logged to `billing`. |

### EPIC 8 – Legacy Number Autoresponder (Optional stretch)

| ID   | User Story                                                                                             | Acceptance Criteria                                                                   |
| ---- | ------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------- |
| AN‑1 | *As owner* I paste my personal WhatsApp QR; incoming messages get auto‑reply linking to funnel number. | — Cloud API auto‑response contains shortlink.<br>— Off by default; beta feature flag. |

---

## 2. Out of Scope for MVP 0.1

* Messenger / SMS intake adapters
* Calendar booking & rescheduling
* Payment collection
* AI answer suggestions (manual reply MVP)
* Multi‑tenant WABA pooling optimisation

---

## 3. Metrics to Validate MVP

* **Lead completion rate** ≥ 70 % (Q1 → summary sent)
* **Qualified leads / User / week** ≥ 5
* **Owner response time** < 30 min median
* **Template reminder opt‑ins** ≥ 50 %

---

## 4. Initial Technical Notes (for ticket breakdown later)

*Numbers via Twilio; Node (Fastify) for webhook; Supabase for auth+DB; Next.js UI.*

---

*End of MVP 0.1 specification – ready to break into sprint tickets.*
