# Japanese Miner v6.4.88

This release sends only questions that were actually answered incorrectly to assessment results and the Notebook.

## Included

- Supabase email/password supporter accounts
- Patreon OAuth 2 linking
- Verified Tier 1–3 game entitlements
- Signed membership webhooks
- Automatic upgrade, downgrade, cancellation, and charge-state handling
- Seven-day offline entitlement grace
- Existing pronunciation, pet display, and deferred-test-treasure fixes
- Placement Test results list only questions answered incorrectly; skipped questions are excluded
- JLPT Review Quiz results list only the questions answered incorrectly
- Guardian Test results list only the questions answered incorrectly
- Incorrectly answered Placement, JLPT Review, Guardian, and Course Quick Practice questions enter the Notebook
- Timed-out, skipped, and otherwise unanswered questions are excluded from both results and the Notebook

The game is intentionally disabled until the administrator supplies public Supabase client configuration and deploys the protected backend. See [PATREON-SETUP.md](PATREON-SETUP.md) for the complete setup checklist.

No Patreon Client Secret, creator access token, service-role key, or webhook secret belongs in the GitHub repository or browser files.
