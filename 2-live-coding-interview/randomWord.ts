function getRandomIntInclusive(min, max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled); // The maximum is inclusive and the minimum is inclusive
}

const randomWord = (words: string[]) => {
    const pairsMap = new Map<string, Set<string>>()

    const start: string[] = []
    const ends = new Set()

    for (let i = 0; i < words.length; i++) {
        const word = words[i];
        
        for (let j = 0; j < word.length - 1; j++) {
            const letter = word[j];
            
            if (!pairsMap.has(letter)) { 
                pairsMap.set(letter, new Set())
            }

            const pairs = pairsMap.get(letter)
            const nextLetter = word[j+1]
            pairs?.add(nextLetter)

            if (j === word.length - 2) {
                ends.add(letter)
            }

            if (j === 0){
                start.push(letter)
            }
        }
    }

    const num = getRandomIntInclusive(0, start.length - 1 )

    const result: string[] = []
    result.push(start[num])
    console.log('result:',result)
    console.log('ends:',ends)

    while(ends.has(result[result.length-1])) {
        const lastLetter = result[result.length-1]
        console.log('lastLetter:',lastLetter)

        const letters = pairsMap.get(lastLetter)
        console.log('letters:',letters)

        const num = getRandomIntInclusive(0, letters?.size - 1)
        const nextLetter = Array.from(letters?.values() || [])[num]

        result.push(nextLetter)
    }

    return result.join('')
}

export { randomWord };
