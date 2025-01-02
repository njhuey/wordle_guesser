package main

import (
	"maps"
	"slices"
	"testing"
)

func TestCheckHello(t *testing.T) {
	word := "hello"
	err := checkWord(word)
	if err != nil {
		t.Errorf("Word %s was incorrectly identified as invalid.", string(word))
	}
}

func TestCheckHelë(t *testing.T) {
	word := "helë"
	err := checkWord(word)
	if err == nil {
		t.Errorf("Word %s was incorrectly identified as valid.", string(word))
	}
}

func TestLetterCountGreat(t *testing.T) {
	word := "great"
	letterCount := getLetterCount(word)
	if !maps.Equal(letterCount, map[rune]int{'g': 1, 'r': 1, 'e': 1, 'a': 1, 't': 1}) {
		t.Errorf("Letter count is incorrect for word: %s", string(word))
	}
}

func TestLetterCountHello(t *testing.T) {
	word := "hello"
	letterCount := getLetterCount(word)
	if !maps.Equal(letterCount, map[rune]int{'h': 1, 'e': 1, 'l': 2, 'o': 1}) {
		t.Errorf("Letter count is incorrect for word: %s", string(word))
	}
}

func TestLetterCountTests(t *testing.T) {
	word := "tests"
	letterCount := getLetterCount(word)
	if !maps.Equal(letterCount, map[rune]int{'t': 2, 'e': 1, 's': 2}) {
		t.Errorf("Letter count is incorrect for word: %s", string(word))
	}
}

func TestEliminateWordsExact(t *testing.T) {
	remainingWords := []string{"hello", "great", "sword"}
	guess := ColoredWord{
		letters: "great",
		colors:  []PossibleColor{Green, Green, Green, Green, Green},
	}

	result := eliminateImpossibleWords(remainingWords, guess)
	if len(result) != 1 {
		t.Errorf("Incorrect number of remaining words returned: %d. Expected: 1", len(result))
	}

	if result[0] != "great" {
		t.Errorf("Incorrect final word remaining: %s", result[0])
	}
}

func TestEliminateWordsPartialGreen(t *testing.T) {
	remainingWords := []string{"cares", "sport", "sworn", "sword"}
	guess := ColoredWord{
		letters: "sport",
		colors:  []PossibleColor{Green, Grey, Green, Green, Grey},
	}

	result := eliminateImpossibleWords(remainingWords, guess)
	if len(result) != 2 {
		t.Errorf("Incorrect number of remaining words returned: %d. Expected 2", len(result))
	}

	if !slices.Equal(result, []string{"sworn", "sword"}) {
		t.Errorf("Incorrect words remaining: %s", result)
	}
}

func TestEliminateWordsPartialMixed(t *testing.T) {
	remainingWords := []string{"cares", "rains", "fairs", "hairs"}
	guess := ColoredWord{
		letters: "rains",
		colors:  []PossibleColor{Yellow, Green, Green, Grey, Green},
	}

	result := eliminateImpossibleWords(remainingWords, guess)
	if len(result) != 2 {
		t.Errorf("Incorrect number of remaining words returned: %d. Expected 2", len(result))
	}

	if !slices.Equal(result, []string{"fairs", "hairs"}) {
		t.Errorf("Incorrect words remaining: %s", result)
	}
}
