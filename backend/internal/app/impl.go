package app

import (
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

func serializeColoredWords(coloredWords []guess.ColoredWord) []serializedColoredWord {
	serializedWords := make([]serializedColoredWord, 0, 6)
	for _, coloredWord := range coloredWords {
		serializedColors := make([]string, 0, 5)
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

func GuessNextWord(c *gin.Context) {
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
		"guesses": serializedColoredWords[:6],
	})
}

func SimulateWordle(c *gin.Context) {
}
