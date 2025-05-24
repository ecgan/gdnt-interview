# Live Coding Interview

The second stage of the interview process was a live coding interview. The interviewer is a software engineer from the company. I was given about 50 minutes to complete the task.

## Question

The task was to implement a function called `randomWord` that takes an array of words and returns a random word that satisfies the following conditions:

1. The first letter of the random word must be the first letter of one of the words input.
2. The last letter of the random word must be the last letter of one of the words input.
3. Each pair of adjacent letters in the random word must exist as adjacent letters in the words input. (This is not applicable when the random word generated is only one letter long.)

Example:

Assume that the words input is `["apple", "banana", "cabbage"]`. The following words are valid random words:

- `"abage"`:
  - First letter: `a` (from `apple`)
  - Last letter: `e` (from `apple`)
  - Adjacent letters: `ab`, `ba`, `ag`, `ge` (all exist in the input words)
- `"bage"`:
  - First letter: `b` (from `banana`)
  - Last letter: `e` (from `apple`)
  - Adjacent letters: `ba`, `ag`, `ge` (all exist in the input words)
- `"a"`:
  - First letter: `a` (from `apple`)
  - Last letter: `a` (from `banana`)
  - Adjacent letters: none (valid since it's only one letter long)
- `"apple"`:
  - First letter: `a` (from `apple`)
  - Last letter: `e` (from `apple`)
  - Adjacent letters: `ap`, `pp`, `pl`, `le` (all exist in the input words)
