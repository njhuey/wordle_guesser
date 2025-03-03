package app

import (
	"fmt"
	"slices"
	"testing"

	"github.com/njhuey/wordle_guesser/backend/internal/guess"
)

func formatColors(colors []string) string {
	return fmt.Sprintf("%s, %s, %s, %s, %s", colors[0], colors[1], colors[2], colors[3], colors[4])
}

func TestSerializeColoredWordSingle(t *testing.T) {
	coloredWords := []guess.ColoredWord{
		{
			Letters: "hello",
			Colors:  []guess.PossibleColor{guess.Grey, guess.Yellow, guess.Yellow, guess.Green, guess.Grey},
		},
	}
	serializedColoredWords := serializeColoredWords(coloredWords)

	expectedColors := []string{"grey", "yellow", "yellow", "green", "grey"}
	if serializedColoredWords[0].Word != coloredWords[0].Letters {
		t.Errorf("The word is incorrect")
	}
	if !slices.Equal(serializedColoredWords[0].Colors, expectedColors) {
		t.Errorf("Incorrect serialized colors created.\nExpected: %s\nActual: %s\n",
			formatColors(expectedColors),
			formatColors(serializedColoredWords[0].Colors),
		)
	}
}
