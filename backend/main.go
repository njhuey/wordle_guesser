package main

import (
	"encoding/csv"
	"fmt"
	"os"
	"unicode"
)

// All possible colors associated with letters in Wordle.
type PossibleColor int

const (
	GREY PossibleColor = iota
	YELLOW
	GREEN
)

// A possible Wordle word with colored letter combinations.
type ColoredWord struct {
	letters string
	colors  [5]PossibleColor
}

// Ideally this should be a path stored in an env file but this is fine for now.
const inputWordsFilename = "words.csv"

// Check if a string is a valid Wordle word.
func checkWord(word string) bool {
	if len(word) != 5 {
		return false
	}

	for _, c := range word {
		if !unicode.IsLetter(c) {
			return false
		}
	}
	return true
}

// Load all possible Wordle words from csv into memory.
func loadAllWords() []string {
	file, err := os.Open(inputWordsFilename)
	if err != nil {
		panic(err)
	}

	reader := csv.NewReader(file)
	reader.FieldsPerRecord = 2
	content, err := reader.ReadAll()
	if err != nil {
		panic(err)
	}

	words := make([]string, len(content))
	for i, row := range content {
		word := row[1]
		if !checkWord(word) {
			errorMessage := fmt.Sprintf(
				"Loaded word '%s' from input csv file '%s' is invalid, exiting.",
				word,
				inputWordsFilename,
			)
			panic(errorMessage)
		}
		words[i] = word
	}
	return words
}

func getLetterCount(word string) map[rune]int {
	letterCount := make(map[rune]int)
	for _, c := range word {
		if _, ok := letterCount[c]; !ok {
			letterCount[c] = 1
		} else {
			letterCount[c] += 1
		}
	}
	return letterCount
}

func determineNextGuess(wordsGuessed []ColoredWord) string {
	return "test"
}

func main() {
	words := loadAllWords()
	fmt.Println(words)
}
