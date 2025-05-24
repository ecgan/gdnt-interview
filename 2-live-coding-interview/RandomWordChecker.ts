import { convertToLettersMap } from './convertToLettersMap'

export const RandomWordChecker = class {
    private lettersMap: Map<string, Set<string>>

    constructor (words: string[]) {
        this.lettersMap = convertToLettersMap(words)
    }

    isValid (word) {
        // Validate rule 1: the string must start with one of the first letters.
        const firstLetters = this.lettersMap.get('') as Set<string>
        if (!firstLetters.has(word[0])) {
            return false
        }

        // Validate rule 2: the string must end with one of the last letters.
        const lastLetter = word[word.length-1]
        const nextLetters = this.lettersMap.get(lastLetter) as Set<string>
        if (!nextLetters.has('')) {
            return false
        }

        // Validate rule 3: each pair of letters should exist 
        // in the orignal words array, i.e. lettersMap.
        // This will also automatically work when the word is only one letter.
        for (let i = 0; i < word.length; i++) {
            const cur = word[i]
            const next = word[i+1] || ''

            const mappedLetters = this.lettersMap.get(cur) as Set<string>

            if (!mappedLetters?.has(next)) {
                return false
            }
        }

        return true
    }
}