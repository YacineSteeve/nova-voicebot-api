interface Scores {
    [key: string]: number
}

interface HighScores {
    found: boolean,
    categories: string[]
}

export default function highScoreCategories(scores: Scores, threshold: number): HighScores {
    const highs: string[] = Object.keys(scores)
        .filter((category) => scores[category] > threshold)
    return {
        found: highs.length > 0,
        categories: highs
    }
}
