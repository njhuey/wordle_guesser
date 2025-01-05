package guess

import (
	"encoding/csv"
	"errors"
	"fmt"
	"github.com/joho/godotenv"
	"os"
	"unicode"
)

// All possible colors associated with letters in Wordle.
type PossibleColor int

const (
	Grey PossibleColor = iota
	Yellow
	Green
)

// A possible Wordle word with colored letter combinations.
type ColoredWord struct {
	letters string
	colors  []PossibleColor
}

// Ideally this should be a path stored in an env file but this is fine for now.
var inputWordsFilename string

// The complete list of words possible in Wordle are available at module init time.
var AllWords []string
var wordSlices map[string][]rune
var wordLetters map[string]map[rune]int

// Check if a string is a valid Wordle word.
func checkWord(word string) error {
	for _, c := range word {
		if !unicode.IsLetter(c) {
			return errors.New(
				fmt.Sprintf("Word %s does not contain strictly English alphabetical letters, exiting.", word),
			)
		}
	}

	constructedWord := []rune(word)
	if len(constructedWord) != 5 {
		return errors.New(fmt.Sprintf("Word %s is not 5 letters long, exiting.", word))
	}

	if len(word) != 5 {
		return errors.New(fmt.Sprintf("Word %s is not valid because it contains characters that are not in the English alphabet, exiting.", word))
	}
	return nil
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

// Load all possible Wordle words from csv into memory. Additionally, load in word slice
// representations and letter counters.
func loadAllWords() ([]string, map[string][]rune, map[string]map[rune]int) {
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
		err := checkWord(word)
		if err != nil {
			errorMessage := fmt.Sprintf(
				"Loaded word '%s' from input csv file '%s' is invalid. Provided error: %s, exiting.",
				word,
				inputWordsFilename,
				err,
			)
			panic(errorMessage)
		}
		words[i] = word
	}

	wordSlices := make(map[string][]rune)
	wordLetters := make(map[string]map[rune]int)

	for _, word := range words {
		wordSlices[word] = []rune(word)
		wordLetters[word] = getLetterCount(word)
	}
	return words, wordSlices, wordLetters
}

// Create a `ColoredWord` from a target word and a guess.
func createColoredWord(guess string, target string) ColoredWord {
	colors := []PossibleColor{Grey, Grey, Grey, Grey, Grey}

	targetLetters := make(map[rune]int)
	for letter, val := range wordLetters[target] {
		targetLetters[letter] = val
	}

	for i, letter := range guess {
		if letter == wordSlices[target][i] {
			colors[i] = Green
			targetLetters[letter] -= 1
		}
	}

	for i, letter := range guess {
		if targetLetters[letter] != 0 && colors[i] != Green {
			colors[i] = Yellow
			targetLetters[letter] -= 1
		}
	}

	return ColoredWord{
		letters: guess,
		colors:  colors,
	}
}

// Given a slice of remaining possible words and a previous guess colored word,
// eliminate words that are no longer possible and return the slice.
func EliminateImpossibleWords(remainingWords []string, guess ColoredWord) []string {
	requiredLetters := make(map[rune]int)
	cappedLetters := make(map[rune]bool)

	for i := range 5 {
		newWords := make([]string, 0, len(remainingWords))
		currentLetter := wordSlices[guess.letters][i]

		switch guess.colors[i] {
		case Grey:
			for _, word := range remainingWords {
				if wordSlices[word][i] != currentLetter {
					newWords = append(newWords, word)
				}
			}
			cappedLetters[currentLetter] = true
		case Yellow:
			for _, word := range remainingWords {
				if wordSlices[word][i] != currentLetter {
					newWords = append(newWords, word)
				}
			}
			if _, ok := requiredLetters[currentLetter]; !ok {
				requiredLetters[currentLetter] = 1
			} else {
				requiredLetters[currentLetter] += 1
			}
		case Green:
			for _, word := range remainingWords {
				if wordSlices[word][i] == currentLetter {
					newWords = append(newWords, word)
				}
			}
			if _, ok := requiredLetters[currentLetter]; !ok {
				requiredLetters[currentLetter] = 1
			} else {
				requiredLetters[currentLetter] += 1
			}
		}
		remainingWords = newWords
	}

	for letter, requiredCount := range requiredLetters {
		newWords := make([]string, 0, len(remainingWords))
		for _, word := range remainingWords {
			if wordLetters[word][letter] >= requiredCount {
				newWords = append(newWords, word)
			}
		}
		remainingWords = newWords
	}

	// If any grey letter has been encountered, the number of required letters must be
	// the same as the number of actual letters in the word.
	for letter := range cappedLetters {
		newWords := make([]string, 0, len(remainingWords))
		for _, word := range remainingWords {
			if wordLetters[word][letter] == requiredLetters[letter] {
				newWords = append(newWords, word)
			}
		}
		remainingWords = newWords
	}
	return remainingWords
}

// Get the total letter frequency of all letter within words.
func getLetterFrequency(words []string) map[rune]int {
	letterFrequency := make(map[rune]int)
	for _, word := range words {
		for _, letter := range word {
			if _, ok := letterFrequency[letter]; !ok {
				letterFrequency[letter] = 1
			} else {
				letterFrequency[letter] += 1
			}
		}
	}
	return letterFrequency
}

// Get the maximum letter sums for a word given letter total frequency.
func getMaxLetterVals(word string, letterFrequency map[rune]int) map[rune]int {
	maxLetterVals := make(map[rune]int)
	for _, letter := range word {
		if _, ok := maxLetterVals[letter]; !ok {
			maxLetterVals[letter] = letterFrequency[letter]
		}
	}
	return maxLetterVals
}

// Evaluate the best word from a list of remaining words by first computing the total
// letter frequecy for all words. Then, choose the word has the max sum of the set of
// it's letter's corresponding frequencies.
func LetterFrequencyEval(words []string) (string, error) {
	if len(words) == 0 {
		return "", errors.New("Attempted to evaluate the best word using letter frequency with an empty slice of words, exiting.")
	}

	letterFrequency := getLetterFrequency(words)

	wordValues := make(map[string]map[rune]int)
	for _, word := range words {
		wordValues[word] = getMaxLetterVals(word, letterFrequency)
	}

	bestWord, high := words[0], 0
	for word, letterVals := range wordValues {
		sum := 0
		for _, val := range letterVals {
			sum += val
		}
		if sum > high {
			bestWord = word
			high = sum
		}
	}
	return bestWord, nil
}

func init() {
	if _, ok := os.LookupEnv("DATA_DIRECTORY"); !ok {
		godotenv.Load()
	}

	dataDirectory := os.Getenv("DATA_DIRECTORY")
	if len(dataDirectory) == 0 {
		dataDirectory = "../../data"
		if _, err := os.Stat(dataDirectory); err != nil {
			if os.IsNotExist(err) {
				panic("env is improperly configured because path to input words unabled to be determined.")
			} else {
				panic(err)
			}
		}
	}

	inputWordsFilename = dataDirectory + "/words.csv"
	AllWords, wordSlices, wordLetters = loadAllWords()
}
