package guess

import (
	"maps"
	"slices"
	"testing"
)

func TestCheckHello(t *testing.T) {
	word := "hello"
	err := CheckWord(word)
	if err != nil {
		t.Errorf("Word %s was incorrectly identified as invalid.", string(word))
	}
}

func TestCheckHelë(t *testing.T) {
	word := "helë"
	err := CheckWord(word)
	if err == nil {
		t.Errorf("Word %s was incorrectly identified as valid.", string(word))
	}
}

func coloredWordChecker(
	t *testing.T,
	targetWord string,
	guess string,
	expectedColoredWord ColoredWord,
) {
	actualColoredWord := CreateColoredWord(guess, targetWord)

	if expectedColoredWord.Letters != actualColoredWord.Letters {
		t.Errorf(
			"Incorrect letters created, expected: %s, actual: %s.",
			expectedColoredWord.Letters,
			actualColoredWord.Letters,
		)
	}
	if !slices.Equal(expectedColoredWord.Colors, actualColoredWord.Colors) {
		t.Errorf(
			"Incorrect colored word created.\nExpected %s\nActual   %s",
			ColorsStringRepr(expectedColoredWord.Colors),
			ColorsStringRepr(actualColoredWord.Colors),
		)
	}
}

func TestCreateColoredWordNoMatch(t *testing.T) {
	targetWord := "sword"
	guess := "funny"

	expectedColoredWord := ColoredWord{
		Letters: guess,
		Colors:  []PossibleColor{Grey, Grey, Grey, Grey, Grey},
	}

	coloredWordChecker(t, targetWord, guess, expectedColoredWord)
}

func TestCreateColoredWordYellowMatch(t *testing.T) {
	targetWord := "great"
	guess := "cares"

	expectedColoredWord := ColoredWord{
		Letters: guess,
		Colors:  []PossibleColor{Grey, Yellow, Yellow, Yellow, Grey},
	}

	coloredWordChecker(t, targetWord, guess, expectedColoredWord)
}

func TestCreateColoredWordGreenPartialMatch(t *testing.T) {
	targetWord := "bares"
	guess := "cares"

	expectedColoredWord := ColoredWord{
		Letters: guess,
		Colors:  []PossibleColor{Grey, Green, Green, Green, Green},
	}

	coloredWordChecker(t, targetWord, guess, expectedColoredWord)
}

func TestCreateColoredWordMixedMatch(t *testing.T) {
	targetWord := "fairs"
	guess := "cares"

	expectedColoredWord := ColoredWord{
		Letters: guess,
		Colors:  []PossibleColor{Grey, Green, Yellow, Grey, Green},
	}

	coloredWordChecker(t, targetWord, guess, expectedColoredWord)
}

func TestCreateColoredWordGreenFullMatch(t *testing.T) {
	targetWord := "fight"
	guess := "fight"

	expectedColoredWord := ColoredWord{
		Letters: guess,
		Colors:  []PossibleColor{Green, Green, Green, Green, Green},
	}

	coloredWordChecker(t, targetWord, guess, expectedColoredWord)
}

func TestLettersCountGreat(t *testing.T) {
	word := "great"
	letterCount := getLetterCount(word)
	if !maps.Equal(letterCount, map[rune]int{'g': 1, 'r': 1, 'e': 1, 'a': 1, 't': 1}) {
		t.Errorf("Letters count is incorrect for word: %s", string(word))
	}
}

func TestLettersCountHello(t *testing.T) {
	word := "hello"
	letterCount := getLetterCount(word)
	if !maps.Equal(letterCount, map[rune]int{'h': 1, 'e': 1, 'l': 2, 'o': 1}) {
		t.Errorf("Letters count is incorrect for word: %s", string(word))
	}
}

func TestLettersCountTests(t *testing.T) {
	word := "tests"
	letterCount := getLetterCount(word)
	if !maps.Equal(letterCount, map[rune]int{'t': 2, 'e': 1, 's': 2}) {
		t.Errorf("Letters count is incorrect for word: %s", string(word))
	}
}

func TestEliminateWordsExact(t *testing.T) {
	remainingWords := []string{"hello", "great", "sword"}
	guess := ColoredWord{
		Letters: "great",
		Colors:  []PossibleColor{Green, Green, Green, Green, Green},
	}

	result := EliminateImpossibleWords(remainingWords, guess)
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
		Letters: "sport",
		Colors:  []PossibleColor{Green, Grey, Green, Green, Grey},
	}

	result := EliminateImpossibleWords(remainingWords, guess)
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
		Letters: "rains",
		Colors:  []PossibleColor{Yellow, Green, Green, Grey, Green},
	}

	result := EliminateImpossibleWords(remainingWords, guess)
	if len(result) != 2 {
		t.Errorf("Incorrect number of remaining words returned: %d. Expected 2", len(result))
	}

	if !slices.Equal(result, []string{"fairs", "hairs"}) {
		t.Errorf("Incorrect words remaining: %s", result)
	}
}

func TestGetLetterFrequency(t *testing.T) {
	words := []string{"hello", "great"}
	expectedLetterFrequency := map[rune]int{
		'l': 2,
		'o': 1,
		'g': 1,
		'r': 1,
		'a': 1,
		't': 1,
		'h': 1,
		'e': 2,
	}
	actualLetterFrequency := getLetterFrequency(words)
	if !maps.Equal(expectedLetterFrequency, actualLetterFrequency) {
		t.Error("Incorrect letter frequency returned")
	}
}

func TestGetMaxLetterValsUnique(t *testing.T) {
	words := []string{"hello", "great", "funny", "sword"}
	letterFrequency := getLetterFrequency(words)
	expectedMaxLetterVals := map[rune]int{
		'g': 1,
		'r': 2,
		'e': 2,
		'a': 1,
		't': 1,
	}
	actualMaxLetterVals := getMaxLetterVals("great", letterFrequency)
	if !maps.Equal(expectedMaxLetterVals, actualMaxLetterVals) {
		t.Error("Incorrect max letter vals returned")
	}
}

func TestGetMaxLetterValsRepeats(t *testing.T) {
	words := []string{"hello", "great", "funny", "sword"}
	letterFrequency := getLetterFrequency(words)
	expectedMaxLetterVals := map[rune]int{
		'h': 1,
		'e': 2,
		'l': 2,
		'o': 2,
	}
	actualMaxLetterVals := getMaxLetterVals("hello", letterFrequency)
	if !maps.Equal(expectedMaxLetterVals, actualMaxLetterVals) {
		t.Error("Incorrect max letter vals returned")
	}
}

func TestLetterFrequencyEval(t *testing.T) {
	words := []string{"hello", "great", "grunt", "bests"}
	bestWord, err := LetterFrequencyEval(words)
	if err != nil {
		t.Errorf("An error was returned when there shouldn't have been: %s", err)
	}
	if bestWord != "great" {
		t.Errorf("The incorrect word was returned from `letterFrequencyEval`: %s", bestWord)
	}
}
