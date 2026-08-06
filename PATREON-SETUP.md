# Japanese Miner Patreon linking setup

Version 6.4.85 contains the complete browser integration, database migration, and Supabase Edge Functions. The game remains safe to open before configuration: Patreon features stay locked and the Patreon panel explains that administrator setup is required.

## What this integration does

- Creates a separate Supabase supporter account for each signed-in email.
- Links that account to Patreon using OAuth 2 authorization code flow.
- Exchanges the Patreon code and checks membership only inside an Edge Function.
- Maps the three immutable Patreon tier IDs to Japanese Miner tiers 1, 2, and 3.
- Keeps upgrades, downgrades, charge changes, and cancellations synchronized through signed Patreon webhooks.
- Rechecks membership at most every 12 hours when a supporter opens the game.
- Allows seven days of offline grace after the last successful verification by default.
- Keeps gameplay saves local. Patreon linking does not upload profile progress.

## 1. Create the Supabase project

Create a Supabase project for Japanese Miner. In **Authentication > URL Configuration**:

1. Set the Site URL to the exact deployed game URL.
2. Add the same URL to the allowed redirect URLs.
3. Keep email confirmation enabled for production.

Run `supabase/migrations/202608060001_patreon_linking.sql` using the Supabase SQL editor or `supabase db push`. The migration creates the two protected tables and their row-level security policy.

## 2. Create the Patreon API v2 client

In Patreon's **Clients & API Keys** page, create an API v2 client. Register this exact callback, replacing the project reference:

```text
https://YOUR_PROJECT_REF.supabase.co/functions/v1/patreon-callback
```

Record these values privately:

- Client ID
- Client Secret
- Creator Access Token
- Japanese Miner campaign ID
- The immutable Patreon tier ID for Supporter
- The immutable Patreon tier ID for Companion Keeper
- The immutable Patreon tier ID for Settlement Founder

The game uses tier IDs rather than prices. This prevents annual billing, discounts, or later price changes from granting the wrong benefits.

To find the campaign and tier IDs, call Patreon's API v2 campaigns endpoint using the creator access token and include `tiers`. Do not put the creator token in a browser request or client file.

## 3. Store protected function secrets

Copy the variable names from `supabase/.env.example` and add their real values with **Supabase Edge Function Secrets**. The following values must remain server-only:

- `PATREON_CLIENT_SECRET`
- `PATREON_CREATOR_ACCESS_TOKEN`
- `PATREON_WEBHOOK_SECRET`
- `SUPABASE_SERVICE_ROLE_KEY`

Set `APP_URL` to the full game URL, including the GitHub repository path and trailing slash. Set `ALLOWED_ORIGINS` to the origin only, such as `https://example.github.io`.

## 4. Deploy the functions

Deploy all five functions:

```text
patreon-start
patreon-callback
patreon-status
patreon-unlink
patreon-webhook
```

The included `supabase/config.toml` leaves JWT verification enabled for start, status, and unlink. Only the OAuth callback and signed Patreon webhook are public.

## 5. Create the Patreon webhook

Create a webhook for:

```text
https://YOUR_PROJECT_REF.supabase.co/functions/v1/patreon-webhook
```

Enable these v2 events:

- `members:create`
- `members:update`
- `members:delete`

Copy the webhook secret into `PATREON_WEBHOOK_SECRET`. The function verifies `X-Patreon-Signature` against the untouched request body before parsing the event.

## 6. Enable the game client

Edit `patreon-config.js`:

```js
window.JAPANESE_MINER_PATREON_CONFIG = Object.freeze({
  enabled: true,
  supabaseUrl: "https://YOUR_PROJECT_REF.supabase.co",
  supabaseAnonKey: "YOUR_PUBLIC_SUPABASE_ANON_KEY",
  patreonJoinUrl: "https://www.patreon.com/cw/Erendragneel/membership",
  offlineGraceDays: 7
});
```

The Supabase project URL and anon key are designed to be public. Do not add any protected Patreon or Supabase secret to this file.

## 7. Production test checklist

Patreon does not provide a separate sandbox API, so use a controlled Patreon test/member account.

1. Open Japanese Miner and sign in to a local player profile.
2. Open **Menu > Patreon**.
3. Create and confirm a supporter cloud account.
4. Sign in and select **Connect Patreon**.
5. Approve access using the Patreon member account.
6. Confirm Tier 1 unlocks cosmetics and titles.
7. Upgrade to Tier 2 and confirm companions unlock after refresh or webhook delivery.
8. Upgrade to Tier 3 and confirm settlement features unlock.
9. Downgrade and confirm higher benefits lock while lower-tier benefits remain.
10. Cancel or produce a former/declined membership and confirm the paid tier becomes zero.
11. Disconnect inside the game and confirm this unlinks access without cancelling the Patreon subscription.
12. Confirm the same supporter account restores its tier on another device after signing in.

## Security notes

- Never commit `.env`, creator tokens, service-role keys, Client Secrets, or webhook secrets.
- The browser never receives or stores Patreon access tokens.
- A Patreon account can be linked to only one Supabase supporter account.
- Webhooks update only an account that was previously linked through OAuth.
- The backend checks campaign ID, active patron status, entitled tier IDs, and rejected charge states.
- Frontend gating is suitable for game cosmetics. Truly private downloadable assets would need to be served from an authenticated backend rather than included in the public ZIP.
