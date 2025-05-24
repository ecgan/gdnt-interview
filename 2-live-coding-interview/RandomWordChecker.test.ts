import { expect, test } from 'vitest'
import { RandomWordChecker } from  './RandomWordChecker'

test('Example 1: ["apple", "banana", "cabbage"] with valid random words', () => {
    const words = ["apple", "banana", "cabbage"]
    const checker = new RandomWordChecker(words)

    expect(checker.isValid("abage")).toBe(true)
    expect(checker.isValid("bage")).toBe(true)
    expect(checker.isValid("a")).toBe(true)
    expect(checker.isValid("abananabbabbabbananabbage")).toBe(true)
})

test('["apple", "banana", "cabbage"] with invalid "e": not a first letter', () => {
    const words = ["apple", "banana", "cabbage"]
    const checker = new RandomWordChecker(words)

    expect(checker.isValid("e")).toBe(false)
})

test('["apple", "banana", "cabbage"] with invalid "b": not a last letter', () => {
    const words = ["apple", "banana", "cabbage"]
    const checker = new RandomWordChecker(words)

    expect(checker.isValid("b")).toBe(false)
})

test('["apple", "banana", "cabbage"] with invalid "applzage": non-existing letter "z"', () => {
    const words = ["apple", "banana", "cabbage"]
    const checker = new RandomWordChecker(words)

    expect(checker.isValid("applzage")).toBe(false)
})

test('["apple", "banana", "cabbage"] with invalid "applage": non-existing pair "la"', () => {
    const words = ["apple", "banana", "cabbage"]
    const checker = new RandomWordChecker(words)

    expect(checker.isValid("applage")).toBe(false)
})
