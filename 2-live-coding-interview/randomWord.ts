import { convertToLettersMap } from './convertToLettersMap'

function getRandomIntInclusive(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled); // The maximum is inclusive and the minimum is inclusive
}

const randomWord = (words: string[]) => {
    const lettersMap = convertToLettersMap(words)

    // We initialize result array with an empty string element,
    // so that the following code will automatically
    // find the first possible letter from the `lettersMap`.
    const result: string[] = ['']

    do {
        const curLetter = result[result.length-1]
        const nextLetters = lettersMap.get(curLetter) as Set<string>
        const num = getRandomIntInclusive(0, nextLetters.size - 1)
        const nextLetter = Array.from(nextLetters.values())[num]

        result.push(nextLetter)
    } while (result[result.length-1] !== '')

    return result.join('')
}

export { randomWord };
