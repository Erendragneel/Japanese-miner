# Japanese Miner v4.0

Japanese Miner v4.0 is a balanced learning-and-gameplay update built from the tested v3.10 release.

## Major v4.0 additions

- Spoken Japanese using the browser's Japanese text-to-speech voice
- Automatic pronunciation when a new question appears
- Normal and slow playback buttons on supported questions
- Adjustable pronunciation speed and persistent voice preferences
- Smart Review that weights unseen and weak questions more heavily
- Session goal, live accuracy, and progress tracking
- Redesigned question cards and improved mobile feedback
- Installable Progressive Web App files and offline caching
- Save migration that preserves existing v3.x local profiles

The voice uses the Japanese voice installed in the player's browser or operating system. Voice quality therefore varies by phone, browser, and device. Chrome and Samsung Internet on Android normally provide Japanese speech synthesis when a Japanese system voice is available.

True automatic cloud synchronization still requires a hosted authentication and database service. Local profiles and portable backup/import remain available.

## Testing

Run the complete release gate with:

```bash
node test-runner.mjs --test all --continue
```

A release is ready only when the final output states `RELEASE GATE PASSED`.
