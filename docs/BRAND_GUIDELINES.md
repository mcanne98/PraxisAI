# Brand guidelines

## Identity

- **Name:** Praxis Intelligence · **Tagline:** From Knowledge to Impact. · **Brand statement:** Learn. Apply. Transform.
- **Meaning:** Praxis is the process of turning knowledge into action. The brand lives in the gap between understanding AI and creating
  measurable outcomes with it.
- **Personality:** executive and credible · intelligent and curious · human-centred · educational · forward-thinking · practical ·
  premium without pretension · confident without hype.

## The Praxis Mark

An open circle (knowledge, potential) joined by one deliberate teal stroke to a solid blue square (action, impact) — theory into
practice. Source: `src/components/brand/wordmark.tsx`; favicon `src/app/icon.svg`.

- Wordmark: **Praxis** (Manrope Bold) + Intelligence (Manrope Medium, muted).
- Minimum size: mark 20 px. Clear space: the circle's diameter on all sides.
- Do not recolour the square or stroke, add effects, or place the mark on busy imagery.

## Colour

| Token      | Hex     | Use                                          | Contrast                           |
| ---------- | ------- | -------------------------------------------- | ---------------------------------- |
| midnight   | #0B1220 | Primary dark surface, text on light          | —                                  |
| slate-deep | #172033 | Cards on dark                                | —                                  |
| blue       | #5271FF | Brand accent — decoration; text on dark only | 4.6:1 on midnight                  |
| blue-ink   | #3D55E0 | Links/buttons/text on light                  | 5.6:1 on paper                     |
| blue-soft  | #7B93FF | Accent text on dark                          | 6.6:1 on midnight                  |
| teal       | #5EEAD4 | Accent on dark                               | 12.7:1 on midnight                 |
| teal-ink   | #0F766E | Eyebrows/labels on light                     | 5.2:1 on paper                     |
| paper      | #F8FAFC | Primary light surface                        | —                                  |
| paper-warm | #F3F1EC | Alternate light section                      | —                                  |
| ink-muted  | #475569 | Secondary text on light                      | 7.2:1 on paper                     |
| mist       | #94A3B8 | Secondary text on dark only                  | 7.3:1 on midnight (fails on light) |

Gradients are restrained: soft blurred blue glows on dark sections and the outcome line in the hero only.

## Typography

- **Manrope** — headings, labels, wordmark. Tight tracking on display sizes.
- **Inter** — body copy and UI.
- **Newsreader (italic)** — editorial accents: pull quotes, practice taglines, the "question we answer".
- Display size: `clamp(2.5rem, …, 4.75rem)`, line-height 1.04.

## Visual principles

Generous whitespace · strong type hierarchy · alternating dark/light/warm sections · abstract geometric visuals (dots → grid → rising
line) · subtle motion only, always disabled under reduced-motion. **Avoid** robots, glowing brains, humanoid AI, stock technology
photos, glassmorphism, heavy gradients and repetitive card grids.

## Writing standards

- Lead with the conclusion; short paragraphs; concrete over abstract.
- Challenge assumptions ("The constraint is rarely the technology.").
- Use frameworks and plain-language analogies. Focus on outcomes.
- Canadian spelling where it differs (organization stays with "z" per Canadian usage; "centre", "licence" as noun).
- **Never use:** "unlock the power of AI", "revolutionize", "cutting-edge", "navigate the ever-evolving landscape", "seamlessly
  transform", "game-changer", "supercharge".
- **Never claim** clients, results, partnerships or credentials that are not verified and approved.
