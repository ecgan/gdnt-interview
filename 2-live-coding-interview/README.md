# Live Coding Interview

The second stage of the interview process was a live coding interview. The interviewer (Kevin) is a software engineer from the company. I was given about 50 minutes to complete the task.

## Question

This is what I remember from the document shown to me during the video call.

The task was to implement a function called `randomWord` that takes an array of words and returns a random word that satisfies the following rules:

1. The first letter of the random word must be the first letter of one of the words input.
2. The last letter of the random word must be the last letter of one of the words input.
3. Each pair of adjacent letters in the random word must exist as adjacent letters in the words input. (This is not applicable when the random word generated is only one letter long.)

Example:

Assume that the words input is `["apple", "banana", "cabbage"]`. The following words are valid random words:

- `"abage"`:
  - First letter: `a` (from `apple`)
  - Last letter: `e` (from `apple`)
  - Adjacent letters: `ab`, `ba`, `ag`, `ge` (all exist in the input words)

The following words are also valid random words that satisfy the three rules above:

- `"banage"`
- `"bage"`
- `"a"`

## During the interview

After I read the question and the given examples, I was feeling a little confused.

The main challenge for me is that the function is supposed to generate a random string. The randomness nature in a coding test like this is quite new to me. My past experience with interviews and coding challenges (e.g. see my solutions for [LeetCode](https://github.com/ecgan/leetcode), [Codility](https://github.com/ecgan/codility) and [HackerRank](https://github.com/ecgan/hackerrank)) are mostly deterministic - given the same input, the function must always return the same output. In these challenges, before I write my solution, I will use the [TDD](https://en.wikipedia.org/wiki/Test-driven_development) approach to write some tests first based on the given examples and requirements. However, for this interview question, since the function should return a random string, what should be the expected correct value in the tests? And what should be the expected wrong value, which is not mentioned in the example?

My mind also got confused with the Rule 3 and the `"a"` example. There wasn't a clear explanation in the document on why `"a"` is a valid word and how it is only one-letter long. I had to ask my interviewer Kevin for more explanation and had to code and try my way forward with uncertainty. My Garmin watch was telling me that my heart rate was at 120bpm. Yup, interview pressure is real.

I looked at the words input and the three rules again. Since the adjacent letters are based on one letter and the letter next to it, I thought that this is a linked list question. Using `["apple", "banana", "cabbage"]` returning `"abage"` as an example, this means that there are three linked lists, and we need to return a new linked list `a -> b -> a -> g -> e`. However, the problem with this thinking is: for a valid word like `"abanabanabanage"`, how do we point back to a character that has already passed in the linked list traversal?

Since my mind is blocked and can't proceed further, I asked Kevin for some hints. He mentioned that since we want to go from one letter to the next possible letters, we would want to have a map of letter pairs. This idea is easy and not new to me, so I proceeded to code it out. I also created new variables to keep track of the starting letters and ending letters, so that it can help us in validating rule 1 and rule 2 later.

After I build the above mapping, it still wasn't quite clear to me on how I should build the valid word. Kevin mentioned using a random number generator to randomly select a starting letter, and then randomly select the next possible letter, and so on. It is at this point that it became clear to me on how the function should work.

However, because I was really nervous, I did quite some minor mistakes in my code. The time ran out and the code did not work as expected. Kevin mentioned that the code should be almost there, and he also gave me some suggestions on how he would write the code, e.g. we do not need the ending letters variable and we can simply reuse the pairs mapping by using `undefined` to indicate that a letter is an ending letter. I asked for his feedback on me, and he mentioned he likes the way I communicate throughout the process, and the way I asked for help when I was blocked. I submitted the code as-is to the hiring team. The code is available in commit [`2cf20df`](https://github.com/ecgan/gdnt-interview/commit/2cf20df2b0bca741ec64759147aad8e6511e7adf).

## After the interview

Even though the interview was over, my mind was still thinking about the problem. When I have a problem, I want to solve it. After I calmed myself down a little from the interview pressure, I looked into my solution again, trying to figure out why my solution did not work. It turned out that there were two typo mistakes in my code. After I fixed the two typos (see commit [`2dc8890`](https://github.com/ecgan/gdnt-interview/commit/2dc889062c991781ad0ad575706f0f8b7ef84b11)), it worked.

I also spent some time thinking about Kevin's suggestion, and I implemented it in commit [`f6f0bd2`](https://github.com/ecgan/gdnt-interview/commit/f6f0bd2540928645fdcf13f95e73658ea3d4d221). It makes the solution simpler and more elegant. I sent a copy of the code - which is working now - to the hiring team again, two hours after the end of the live coding interview.

Even though I have a working solution, I am still feeling restless. Earlier in this article, I mentioned that the main challenge for me is the randomness nature of this coding question. How do we test the correctness of the solution? In the test file, I was just doing `console.log('result:', result)` without doing any assertion. That didn't sit well with me.

I gave some thoughts about this, and I figured a way to *turn randomness into deterministic tests*.

When we call `randomWord(words)` function, it will generate and return a random word. We need another function to check whether the random word satisfies the three rules. The first idea of the function is something like this:

```js
checkRandomWordIsValid(words, generatedWord)

// Example usage:
checkRandomWordIsValid(["apple", "banana", "cabbage"], "abage") // returns true.
checkRandomWordIsValid(["apple", "banana", "cabbage"], "bage") // returns true.
checkRandomWordIsValid(["apple", "banana", "cabbage"], "a") // returns true.

checkRandomWordIsValid(["apple", "banana", "cabbage"], "ge") // returns false: "g" is not a starting letter.
checkRandomWordIsValid(["apple", "banana", "cabbage"], "ban") // returns false: "n" is not an ending letter.
checkRandomWordIsValid(["apple", "banana", "cabbage"], "cabnage") // returns false: "bn" is not a valid adjacent letters.

// In tests:
expect(checkRandomWordIsValid(["apple", "banana", "cabbage"], "abage")).toBe(true)
```

With the above, we have deterministics tests! Also, by having this function, internally we would essentially have the same logic for generating letter pairs (this is now done in commit [`1681d0e`]<https://github.com/ecgan/gdnt-interview/commit/1681d0ef5b9572a5e58559f9ee18209b00ac6721>) with a new function called `convertToLettersMap`). On hindsight, I felt that if I were to think of creating deterministic tests in the first place, it would definitely help guide me in thinking and creating a working solution for the question.

However, this is just one part of the story. We have a new function `checkRandomWordIsValid` and we have tests for it, but how do we test the main `randomWord` function in question?

The answer lies in calling `randomWord` function many times, and for each answer that it generates, we call `checkRandomWordIsValid` function, and it must return true. That's it! We don't need to check for false value since `randomWord` should never return an invalid word.

Here's an example:

```js
// inside a for-loop that iterates for 1000 times:
const word = randomWord(["apple", "banana", "cabbage"])
const isValid = checkRandomWordIsValid(["apple", "banana", "cabbage"], word)
expect(isValid).toBe(true)
```

Since we will be calling `checkRandomWordIsValid` function many times, instead of rebuilding the letter pairs internally every time it is called, we can come up with a `RandomWordChecker` class, build and store the letter mapping when we instantiate a new `RandomWordChecker` object, and reuse the same object by calling its `isValid(word)` method.

The test for `randomWord` function would then become like this:

```js
const words = ["apple", "banana", "cabbage"]
const checker = new RandomWordChecker(words)

for (let i = 0; i < 1000; i++) {
    const result = randomWord(words)
    expect(checker.isValid(result)).toBe(true)
}
```

So, to recap, at this point, for this live coding interview question:

- We have a working solution for `randomWord`.
- We came up with a `RandomWordChecker`, and we have tests for it, to make sure that a word satisfies the three rules in the question.
- `randomWord` and `RandomWordChecker` depends on `convertToLettersMap` function to build a map of letter pairs. The function is indirectly covered by the tests for `RandomWordChecker`.
- We have tests for `randomWord` which make use of the `RandomWordChecker`, and we call it many times to make sure that every random word generated is valid.
- We have 100% test coverage.

That's all from me. All the problems and challenges are solved. Even though I did not do really well as I hoped for during the live coding interview, this is an interesting learning experience, and I'm glad with what I came up with above.

Thank you for reading.
