package app

import (
	"slices"
	"strings"
	"testing"

	"github.com/njhuey/wordle_guesser/backend/internal/guess"
)

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
			strings.Join(expectedColors, " "),
			strings.Join(serializedColoredWords[0].Colors, " "),
		)
	}
}

func TestDeserializeColoredWordSingle(t *testing.T) {
	serializedColoredWords := []serializedColoredWord{
		{
			Word:   "hello",
			Colors: []string{"green", "grey", "yellow", "grey", "green"},
		},
	}
	deserializedColoredWords := deserializeColoredWords(serializedColoredWords)

	expectedColors := []guess.PossibleColor{guess.Green, guess.Grey, guess.Yellow, guess.Grey, guess.Green}
	if serializedColoredWords[0].Word != deserializedColoredWords[0].Letters {
		t.Errorf("The word is incorrect")
	}
	if !slices.Equal(deserializedColoredWords[0].Colors, expectedColors) {
		t.Errorf("Incorrect serialized colors created.")
	}
}
