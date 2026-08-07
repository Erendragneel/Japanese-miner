# Language Miner v6.4.91

Language Miner is the renamed, save-compatible release of the Japanese-learning mining game.

## Included

- Complete Hiragana through JLPT N1 learning game
- Correct Japanese pronunciation routing
- Optional floating pet display
- Deferred quiz and test treasure notifications
- Wrong-answer-only assessment results and Notebook review
- One Supabase account for game access and Patreon OAuth 2 linking
- Existing local saves can attach that account without losing progress
- Verified Patreon Tier 1–3 entitlements
- Signed membership webhooks and seven-day offline grace
- Beginner-friendly Patreon/Supabase setup guide
- Safe helper for finding Patreon campaign and tier IDs

## Existing saves

Player storage keys and the backup data format intentionally keep their historical internal names. This lets existing players continue using their saves after the visible game name changes to Language Miner.

## Patreon setup

Patreon linking is enabled in this connected release for the Language Miner Supabase project. The database migration, five Edge Functions, protected secrets, OAuth client, tier mapping, and signed Patreon webhook were configured on August 7, 2026. [PATREON-SETUP.md](PATREON-SETUP.md) remains included as the administrator reference.

Never place a Patreon Client Secret, Creator Access Token, webhook secret, database password, or Supabase service-role key in GitHub or browser files.
