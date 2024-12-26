package main

import (
	"encoding/csv"
	"fmt"
	"os"
)

const INPUT_WORDS_FILENAME = "words.csv"

func load_all_words() []string {
	file, err := os.Open(INPUT_WORDS_FILENAME)
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
		words[i] = row[1]
	}
	return words
}

func main() {
	words := load_all_words()
	fmt.Println(words)
}
