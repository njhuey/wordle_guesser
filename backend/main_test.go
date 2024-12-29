package main

import (
	"testing"
)

func isMapEqual(m1 map[rune]int, m2 map[rune]int) bool {
	if len(m1) != len(m2) {
		return false
	}

	for k, v := range m1 {
		if m2[k] != v {
			return false
		}
	}
	return true
}

func TestLetterCountGreat(t *testing.T) {
	word := "great"
	letterCount := getLetterCount(word)
	if !isMapEqual(letterCount, map[rune]int{'g': 1, 'r': 1, 'e': 1, 'a': 1, 't': 1}) {
		t.Errorf("Letter count is incorrect for word: %s", word)
	}
}

func TestLetterCountHello(t *testing.T) {
	word := "hello"
	letterCount := getLetterCount(word)
	if !isMapEqual(letterCount, map[rune]int{'h': 1, 'e': 1, 'l': 2, 'o': 1}) {
		t.Errorf("Letter count is incorrect for word: %s", word)
	}
}

func TestLetterCountTests(t *testing.T) {
	word := "tests"
	letterCount := getLetterCount(word)
	if !isMapEqual(letterCount, map[rune]int{'t': 2, 'e': 1, 's': 2}) {
		t.Errorf("Letter count is incorrect for word: %s", word)
	}
}
