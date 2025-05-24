import { expect, test } from 'vitest'
import { RandomWordChecker } from './RandomWordChecker'
import { randomWord } from  './randomWord'

test('Example 1: call `randomWord` for 1000 times and check the result with `RandomWordChecker`: all results should be valid', () => {
    const words = ["apple", "banana", "cabbage"]
    const checker = new RandomWordChecker(words)

    for (let i = 0; i < 1000; i++) {
        const result = randomWord(words)

        expect(checker.isValid(result)).toBe(true)
    }
})
