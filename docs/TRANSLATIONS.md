# Translations and Internationalization

PlotGame should be playable regardless of the player's language.

English and Spanish are the initial target languages, but additional languages should be contributable without changing gameplay logic.

## Principles

1. Player-facing text should eventually be separated from game logic.
2. Use stable translation keys when the internationalization layer is introduced.
3. English can act as the initial fallback locale.
4. Spanish should be maintained alongside English for the initial multilingual release.
5. Mathematical expressions, variable names, and formulas should not be blindly translated.
6. Placeholders and interpolation variables must be preserved exactly.
7. UI layout should tolerate strings that are longer than English.
8. Right-to-left support should remain architecturally possible even if it is not part of the first release.
9. A machine- or AI-generated translation should not automatically be marked as community-verified.

## Translation is a first-class contribution

Possible translation areas include:

- menus
- buttons
- challenge descriptions
- hints
- onboarding
- accessibility text
- error messages
- achievements
- story/progression copy
- editor UI
- community moderation UI

## Suggested contribution flow

In early versions, translations can live in locale files in the repository.

A translation contribution should:

- add or update the appropriate locale file;
- preserve all translation keys;
- preserve placeholders;
- avoid changing mathematical meaning;
- identify whether it is a fluent/community-reviewed translation or a draft.

If translation volume becomes large, the project can consider a dedicated localization platform.

## Why translations matter here

Translation is not secondary polish.

PlotGame is intended to let students and players from different places participate in the same game and community. A translation contribution is therefore a meaningful product contribution even when it contains no gameplay code.
