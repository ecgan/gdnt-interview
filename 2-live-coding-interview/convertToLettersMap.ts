/**
 * Returns a map that stores the mapping of one letter to next possible letters based on the `words` array.
 * 
 * Empty string '' is used to denote the start and the end of the word, e.g. with the word `"apple"`:
 * 
 * `'' => 'a'` means 'a' is the first letter of a word.
 * 
 * `'e' => ''` means 'e' is the last letter of a word.
 */
const convertToLettersMap = (words: string[]) => {
    const map: Map<string, Set<string>> = new Map()

    words.forEach((word) => {
        if (!map.has('')) {
            map.set('', new Set())
        }

        const firstLetters = map.get('') as Set<string>
        firstLetters.add(word[0])

        for (let i = 0; i < word.length; i++) {
            const letter = word[i];
            
            if (!map.has(letter)) {
                map.set(letter, new Set())
            }

            const nextLetters = map.get(letter) as Set<string>
            const nextLetter = word[i+1] || ''
            nextLetters.add(nextLetter)
        }
    })

    return map
}

export { convertToLettersMap }
