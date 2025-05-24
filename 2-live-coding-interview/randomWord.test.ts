import { expect, test } from 'vitest'
import { randomWord } from  './randomWord'

test('Example 1: ', () => {
    const result = randomWord(["apple", "banana", "cabbage"])
    console.log('result:', result)
})

test('Example 1 with cabbzkcd: ', () => {
    const result = randomWord(["apple", "banana", "cabbzkcd"])
    console.log('result:', result)
})

test('Example 2: ', () => {
    const result = randomWord(["apple", "cabbage"])
    console.log('result:', result)
})

test('Example 2 with zebra: ', () => {
    const result = randomWord(["apple", "cabbage", "zebra"])
    console.log('result:', result)
})
