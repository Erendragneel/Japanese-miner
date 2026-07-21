# Japanese Miner v3.10

Adds daily and weekly quests, achievements and equippable titles, an automatic mistake notebook, detailed player statistics, and portable account backup/import for moving progress between browsers or devices.

True automatic cloud synchronization still requires a hosted authentication and database service; this build provides safe cross-device export/import without pretending local browser storage is cloud storage.


## v3.10 Kana-first progression

Hiragana Mine and Katakana Cavern now contain kana recognition drills only. Vocabulary, kanji, grammar, sentences, and tutor curriculum begin in the JLPT N5 Quarry.

## Automated compile and unit tests

This build includes a dependency-free Node.js test runner. Node.js 18 or newer is recommended.

### Quick compile only

Linux/macOS:

```bash
./test-game.sh --quick
```

Windows Command Prompt:

```bat
test-game.cmd --quick
```

Cross-platform Node command:

```bash
node test-runner.mjs --quick
```

### Run every test and stop immediately on the first failure

```bash
node test-runner.mjs --test all --fail-fast
```

### Run every test but continue to report all failures

```bash
node test-runner.mjs --test all --continue
```

### Run one specific test

```bash
node test-runner.mjs --test kana-only-mines --fail-fast
```

Use `node test-runner.mjs --list` to display all test names and their intent. Every run prints the current test, its intent, pass/fail status, and a final release-gate result. A failed release gate explicitly instructs the developer to continue updating the code until all tests pass.


## v3.10 regression release gate

The automated suite now runs 16 checks covering compilation, required assets, unique HTML IDs, kana-only progression, N5 vocabulary placement, question and answer integrity, content volume, stage unlock rules, gemstone and shop economy, profile-save separation, save normalization, runner behavior, and version consistency.

The integrity gate also corrected an issue where shared N5 readings could create duplicate answer choices.

Recommended release command:

```bash
./test-game.sh --test all --continue
```

A release is ready only when the final output states `RELEASE GATE PASSED`.
