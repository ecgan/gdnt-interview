import { convertToLettersMap } from './convertToLettersMap'

function getRandomIntInclusive(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled); // The maximum is inclusive and the minimum is inclusive
}

const randomWord = (words: string[]) => {
    const lettersMap = convertToLettersMap(words)

    const num = getRandomIntInclusive(0, words.length - 1 )

    const result: string[] = []
    result.push(words[num][0])

    while(true) {
        const lastLetter = result[result.length-1]
        if (lastLetter === '') {
            break;
        }

        const letters = lettersMap.get(lastLetter) || new Set()

        const num = getRandomIntInclusive(0, letters?.size - 1)
        const nextLetter = Array.from(letters?.values() || [])[num]

        result.push(nextLetter)
    }

    return result.join('')
}

export { randomWord };
