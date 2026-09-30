# PlotGame

**Learn how functions behave by playing with them.**

PlotGame is a playable experiment built around a simple idea: mathematical functions can become something you *feel* and experiment with, not only something you calculate on paper.

Players observe a level, write a function, press **TRY**, and watch the character follow the resulting curve. The goal is to reach the finish, avoid obstacles, and optionally collect every coin.

PlotGame is being developed in public with the goal of becoming an open-source community game where people can play, create levels, contribute features, translate the experience, and learn by building together.

> PlotGame is not presented as a validated educational intervention. Its learning value is a design hypothesis that should be tested with real players over time.

## What exists today

The current prototype includes:

- 12 playable challenges across several function families
- freely selectable challenges rather than forced progression
- a sandbox for experimenting with functions and comparing curves
- free-form mathematical expression input
- hidden trajectories until the player presses **TRY**
- obstacles, finish conditions, optional coins, hints, coordinates, and previous-attempt traces
- support for linear, quadratic, absolute value, exponential, logarithmic, radical, trigonometric, rational, and combined expressions

The current game lives in `dist/` and is deployed with the existing GitHub Pages workflow.

## Where we want to take it

Current directions include:

- more levels and function families
- persistent progress
- points and achievements
- unlockable cosmetic skins
- optional story/progression paths without locking harder challenges
- richer game mechanics and modes
- multilingual support
- an in-game level editor
- community-created challenges published directly inside PlotGame
- automatic classification of level solutions for hints
- community discovery, ratings, and difficulty systems
- stronger accessibility and polish

See [ROADMAP.md](ROADMAP.md).

## Three ways to participate

### 1. Play

Experiment, fail, retry, and build intuition for how functions behave.

### 2. Create

The planned in-game level editor will let players create maps without writing code. Creators will place obstacles, platforms, coins, and goals using a constrained editor, provide an **Author Solution** to prove the challenge is solvable, and publish it to **Community Challenges**.

Community levels are **not GitHub contributions**. They belong inside the game.

### 3. Build

Contribute to PlotGame itself: gameplay, art, UX, accessibility, translations, documentation, infrastructure, new systems, bug fixes, or product ideas.

Designers, educators, students, mathematicians, artists, experienced engineers, beginners, and AI-assisted builders are welcome if they are willing to test, understand, and take responsibility for what they contribute.

Start with [CONTRIBUTING.md](CONTRIBUTING.md).

## Learning happens at multiple levels

- **players** can build graphical intuition through play;
- **level creators** can learn to design mathematical challenges;
- **contributors** can learn how open-source collaboration works;
- **maintainers** can learn how to guide and coordinate a growing product.

Nobody needs to participate in every layer.

## Languages

PlotGame should not be English-only.

English and Spanish are the initial target languages, but the project should be designed so additional languages can be contributed without changing gameplay logic. Translation is a first-class contribution path.

See [docs/TRANSLATIONS.md](docs/TRANSLATIONS.md).

## Contributing

For non-trivial product ideas, propose the idea before building it.

Typical flow:

**Idea → Discussion / Issue → Accepted scope → Pull Request → Review → Merge**

Until GitHub Discussions are enabled, early proposals can use the feature proposal Issue template.

Small bug fixes, typo fixes, and contained translation improvements may go directly to a Pull Request when the change is obvious.

See [CONTRIBUTING.md](CONTRIBUTING.md).

## Community levels vs. code contributions

These are intentionally different systems.

- **GitHub contributions** improve PlotGame as a product.
- **Community levels** will be created and published inside the game with a no-code editor.

See [docs/COMMUNITY_LEVELS.md](docs/COMMUNITY_LEVELS.md).

## Running the current prototype locally

PlotGame is currently a static HTML/CSS/JavaScript project and does not require a build step.

From the repository root, with Python installed:

```bash
python -m http.server 8000 --directory dist
```

Then open `http://localhost:8000`.

On Windows, `py` may be used instead of `python`.

## Repository structure

- `dist/` — current playable prototype
- `.github/workflows/deploy-pages.yml` — existing GitHub Pages deployment
- `.github/ISSUE_TEMPLATE/` — contribution intake templates
- `docs/` — collaboration, translation, governance, and community-level documentation
- `ROADMAP.md` — current product direction
- `CONTRIBUTING.md` — how to participate in the project

## Project direction

PlotGame is currently led by **Marco Amado**. Product direction is intentionally lightweight at this stage: decisions should be transparent, contributions should be attributable, and governance should become more formal only when the community actually needs it.

See [docs/GOVERNANCE.md](docs/GOVERNANCE.md).

## License

**License decision pending before public contributions are accepted.**

Code and creative assets may need different licensing rules. This will be resolved explicitly before contributors are asked to submit reusable code, skins, or other assets.
