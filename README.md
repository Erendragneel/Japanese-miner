# Japanese Miner v5.3.1

Adds a fully customizable miner character profile with selectable skin tone, hair style, hair color, clothing top, clothing bottom, accessories, and randomization. Character choices save per profile and travel with exported backups.

A balanced Japanese-learning mining game with browser-based Japanese pronunciation, smart review, kana-first progression, JLPT study content, collectible gemstones, Nuggets, quests, achievements, and portable player backups.

## v4.2 player progression systems

### Daily and weekly quests

The Player Center includes daily and weekly objectives. Completed objectives award Nuggets and each reward can only be claimed once during its active day or week.

### Achievements and equippable titles

Milestones such as First Strike, Century Miner, Kana Master, and N5 Graduate award Nuggets and unlock titles that players can equip on their profile.

### Mistake Notebook

Incorrect answers are recorded with the question, incorrect response, correct response, mine, miss count, and latest miss date. Players can mark entries reviewed and restore them later.

### Detailed statistics

The statistics screen tracks questions answered, accuracy, study days, best streak, practice distribution, mine XP, mine mastery, and a recommended weak category.

### Portable account backup

Players can export their complete profile to a JSON backup and import it on another browser or device. This preserves progression, inventory, placement results, achievements, mistakes, cosmetics, and settings. Automatic cloud synchronization still requires a separately configured hosted authentication and database service.

## Voice learning and smart review

Japanese text can be spoken through the browser speech engine using a Japanese voice. Players can enable automatic pronunciation, replay at normal or slow speed, adjust speech rate, and use Smart Review to prioritize unseen or frequently missed questions.

## Installable offline app

The web manifest and service worker allow supported browsers to install Japanese Miner to the home screen and cache the main game files after the first successful visit.

## Automated release gate

Run the full test suite with Node.js 18 or newer:

```bash
node test-runner.mjs --test all --continue
```

A release is ready only when the output states `RELEASE GATE PASSED`.

