# Community Levels

Community levels are a **player-creation system inside PlotGame**, not a GitHub contribution workflow.

## Intended creation flow

1. Open the in-game level editor.
2. Place or drag obstacles, platforms, coins, start and finish elements using a constrained toolset.
3. Configure the challenge.
4. Enter an **Author Solution**.
5. PlotGame validates that the Author Solution successfully completes the level.
6. PlotGame classifies the mathematical family or families involved.
7. Publish the level to **Community Challenges**.
8. Other players may solve it with the same function or with a different valid function.

## Author Solution

Every published level should include an exact Author Solution.

The Author Solution has three purposes:

- prove the level is solvable;
- support automatic mathematical classification;
- power optional hints.

It is **not** the only valid answer.

If another function satisfies the level rules, avoids obstacles, reaches the finish, and meets the required objectives, it should count.

The Author Solution should not be exposed to the client in a way that makes it trivial to inspect and copy.

## Automatic classification

The classifier may assign one or more mathematical tags, for example:

- Linear
- Quadratic
- Polynomial
- Exponential
- Logarithmic
- Trigonometric
- Rational
- Radical
- Combined / composed

Prefer multi-label classification when it communicates the structure better than a generic "combined" label.

Tags may power graduated hints without revealing the exact solution.

## Difficulty

Difficulty is intentionally not frozen yet.

A possible model:

- new level: `Unrated`
- optional creator estimate
- later community/system rating based on real play data

Possible signals include completion rate, attempts, perfect completion, abandonment, player perception, mathematical complexity, and execution precision.

The exact model is an open product question.

## GitHub boundary

A player publishing a level does not need:

- GitHub
- commits
- Pull Requests
- programming knowledge

GitHub is for improving the product and its systems.

The in-game editor is for creating playable content.
