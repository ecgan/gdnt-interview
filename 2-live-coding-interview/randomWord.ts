function getRandomIntInclusive(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled); // The maximum is inclusive and the minimum is inclusive
}

const randomWord = (words: string[]) => {
    const pairsMap = new Map<string, Set<string>>()

    for (let i = 0; i < words.length; i++) {
        const word = words[i];
        
        for (let j = 0; j < word.length; j++) {
            // iterate over the letters in the word.
            const letter = word[j];
            
            if (!pairsMap.has(letter)) { 
                pairsMap.set(letter, new Set())
            }

            const pairs = pairsMap.get(letter)
            const nextLetter = word[j+1] || ''
            pairs?.add(nextLetter)
        }
    }

    const num = getRandomIntInclusive(0, words.length - 1 )

    const result: string[] = []
    result.push(words[num][0])

    while(true) {
        const lastLetter = result[result.length-1]
        if (lastLetter === '') {
            break;
        }

        const letters = pairsMap.get(lastLetter) || new Set()

        const num = getRandomIntInclusive(0, letters?.size - 1)
        const nextLetter = Array.from(letters?.values() || [])[num]

        result.push(nextLetter)
    }

    return result.join('')
}

export { randomWord };
