package app

import (
	"errors"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/njhuey/wordle_guesser/backend/internal/guess"
)

type wordleRequest struct {
	TargetWord string `json:"target_word"`
}

type serializedColoredWord struct {
	Word   string   `json:"word"`
	Colors []string `json:"colors"`
}

func min(a int, b int) int {
	if a < b {
		return a
	}
	return b
}

func serializeColoredWords(coloredWords []guess.ColoredWord) []serializedColoredWord {
	serializedWords := make([]serializedColoredWord, 0)
	for _, coloredWord := range coloredWords {
		serializedColors := make([]string, 0)
		for _, color := range coloredWord.Colors {
			switch color {
			case guess.Grey:
				serializedColors = append(serializedColors, "grey")
			case guess.Yellow:
				serializedColors = append(serializedColors, "yellow")
			case guess.Green:
				serializedColors = append(serializedColors, "green")
			}
		}
		serializedWords = append(serializedWords, serializedColoredWord{
			Word:   coloredWord.Letters,
			Colors: serializedColors,
		})
	}
	return serializedWords
}

func deserializeColoredWords(serializedWords []serializedColoredWord) []guess.ColoredWord {
	coloredWords := make([]guess.ColoredWord, 0)
	for _, serializedColoredWord := range serializedWords {
		colors := make([]guess.PossibleColor, 0)
		for _, color := range serializedColoredWord.Colors {
			switch color {
			case "grey":
				colors = append(colors, guess.Grey)
			case "yellow":
				colors = append(colors, guess.Yellow)
			case "green":
				colors = append(colors, guess.Green)
			}
		}
		coloredWords = append(coloredWords, guess.ColoredWord{
			Letters: serializedColoredWord.Word,
			Colors:  colors,
		})
	}
	return coloredWords
}

func validateColoredWords(coloredWords []serializedColoredWord) error {
	for _, coloredWord := range coloredWords {
		if err := guess.CheckWord(coloredWord.Word); err != nil {
			return err
		}
		if len(coloredWord.Colors) != 5 {
			return errors.New("Improperly formatted colored word, colors list's length is not 5.")
		}
		for _, color := range coloredWord.Colors {
			if color != "grey" && color != "yellow" && color != "green" {
				return errors.New("Provided colored word contains a color that is invalid.")
			}
		}
	}
	return nil
}

func GuessNextWord(c *gin.Context) {
	var previousWords []serializedColoredWord

	if err := c.BindJSON(&previousWords); err != nil {
		c.AbortWithError(http.StatusBadRequest, err)
		return
	}
	if err := validateColoredWords(previousWords); err != nil {
		c.AbortWithError(http.StatusBadRequest, err)
		return
	}

	coloredWords := deserializeColoredWords(previousWords)
	nextGuess := guess.EvaluateBestNextGuess(coloredWords, guess.PositionalLetterFrequencyEval)

	c.IndentedJSON(http.StatusOK, gin.H{
		"next_guess": nextGuess,
	})
}

func GuessTargetWord(c *gin.Context) {
	var request wordleRequest

	if err := c.BindJSON(&request); err != nil {
		c.AbortWithError(http.StatusBadRequest, err)
		return
	}
	if err := guess.CheckWord(request.TargetWord); err != nil {
		c.AbortWithError(http.StatusBadRequest, err)
		return
	}

	coloredWords, err := guess.SimulateWordleStrategy(request.TargetWord, guess.PositionalLetterFrequencyEval)
	if err != nil {
		c.AbortWithError(http.StatusBadRequest, err)
	}
	serializedColoredWords := serializeColoredWords(coloredWords)

	c.IndentedJSON(http.StatusOK, gin.H{
		"guesses": serializedColoredWords[:min(len(serializedColoredWords), 6)],
	})
}
