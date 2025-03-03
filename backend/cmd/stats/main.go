package main

import (
	"fmt"
	"time"

	"github.com/njhuey/wordle_guesser/backend/internal/guess"
)

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
		coloredWords, err := guess.SimulateWordleStrategy(word, evalFunc)
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
