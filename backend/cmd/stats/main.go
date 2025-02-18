package main

import (
	"errors"
	"fmt"
	"github.com/njhuey/wordle_guesser/backend/internal/guess"
	"time"
)

// Simulate Wordle using a given word and evaluation strategy.
func simulateWordleStrategy(
	targetWord string,
	evalFunc guess.EvalFunction,
) ([]guess.ColoredWord, error) {
	remainingWords := make([]string, len(guess.AllWords))
	copy(remainingWords, guess.AllWords)
	coloredWords := make([]guess.ColoredWord, 0, 10)

	for len(remainingWords) != 0 {
		bestGuess, err := evalFunc(remainingWords)
		if err != nil {
			panic(err)
		}

		coloredWord := guess.CreateColoredWord(bestGuess, targetWord)
		coloredWords = append(coloredWords, coloredWord)
		if bestGuess == targetWord {
			break
		}

		remainingWords = guess.EliminateImpossibleWords(remainingWords, coloredWord)
	}
	if len(remainingWords) == 0 {
		return nil, errors.New("No words remain while simulating Wordle, therefore, there is a bug in the evaluation function.")
	}
	return coloredWords, nil
}

type evalStats struct {
	stratName     string
	successRate   float64
	avgNumGuesses float64
	runDuration   time.Duration
}

// Simulate Wordle for all words given a evaluation strategy to calculate statistics.
func calculateWordleEffectiveness(stratName string, evalFunc guess.EvalFunction) evalStats {
	numSuccess := 0
	totalNumGuesses := 0
	start := time.Now()
	for _, word := range guess.AllWords {
		coloredWords, err := simulateWordleStrategy(word, evalFunc)
		if err != nil {
			panic(err)
		}

		if len(coloredWords) <= 6 {
			numSuccess += 1
		}
		totalNumGuesses += len(coloredWords)
	}

	return evalStats{
		stratName:     stratName,
		successRate:   float64(numSuccess) / float64(len(guess.AllWords)),
		avgNumGuesses: float64(totalNumGuesses) / float64(len(guess.AllWords)),
		runDuration:   time.Since(start),
	}
}

func main() {
	fmt.Println("Evaluation Statistics")
	fmt.Printf("%-30s%-30s%-30s%-30s\n", "Strategy Name", "Success Rate", "Average Num Guesses", "Run Duration")

	var strats evalStats
	for stratName, evalFunc := range guess.EvalStrategies {
		strats = calculateWordleEffectiveness(stratName, evalFunc)
		fmt.Printf("%-30s%-30f%-30f%-30d\n", strats.stratName, strats.successRate, strats.avgNumGuesses, strats.runDuration)
	}
}
