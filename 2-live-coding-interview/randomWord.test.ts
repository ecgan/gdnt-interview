import { expect, test } from 'vitest'
import { randomWord } from  './randomWord'

test('Example 1: ', () => {
    expect(randomWord(["apple", "banana", "cabbage"])).toBe('a')
})

test('Example 1: ', () => {
    expect(randomWord(["apple", "banana", "cabbzkcd"])).toBe('a')
})

test('Example 2: ', () => {
    expect(randomWord(["apple", "cabbage"])).not.toBe('a')
})

test('Example 2: ', () => {
    expect(randomWord(["apple", "cabbage", "zebra"])).not.toBe('a')
})
