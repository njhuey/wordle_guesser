package main

import (
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/njhuey/wordle_guesser/backend/internal/app"
)

func main() {
	router := gin.Default()

	router.Use(cors.New(cors.Config{
		AllowOrigins: []string{"http://localhost:3000", "http://wordlebot.nhuey.com"}, // allow your frontend
		AllowMethods: []string{"GET", "POST"},
		AllowHeaders: []string{"Origin", "Content-Type", "Authorization"},
	}))

	router.POST("/next_word", app.GuessNextWord)
	router.POST("/target_word", app.GuessTargetWord)

	if err := router.Run(":8080"); err != nil {
		panic(err)
	}
}
