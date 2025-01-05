package main

import (
	"fmt"
	"github.com/njhuey/wordle_guesser/backend/internal/guess"
)

// Simulate Wordle using a given word and evaluation strategy.
func simulateWordleStrategy(
	targetWord string,
	evalFunc func(words []string) (string, error),
) {

	var remainingWords []string
	for _, word := range guess.AllWords {
		fmt.Println(word)

		copy(remainingWords, guess.AllWords)
		for i := range 6 {
			bestGuess, err := evalFunc(remainingWords)
			if err != nil {
				panic(err)
			}

			if bestGuess == targetWord {
				fmt.Printf("Found the target word %s in %d tries", targetWord, i)
				break
			}
		}
		break
	}
}

func main() {

}
