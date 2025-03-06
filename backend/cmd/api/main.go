package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/njhuey/wordle_guesser/backend/internal/app"
)

func allowedHostsMiddleware(allowedHosts []string) gin.HandlerFunc {
	return func(c *gin.Context) {
		host := c.Request.Host
		allowed := false

		for _, allowedHost := range allowedHosts {
			if host == allowedHost {
				allowed = true
				break
			}
		}

		if !allowed {
			c.AbortWithStatusJSON(http.StatusForbidden, gin.H{"error": "Forbidden host"})
			return
		}

		c.Next()
	}
}

func main() {
	router := gin.Default()

	allowedHosts := []string{"wordlebot.nhuey.com", "localhost:8080"}
	router.Use(allowedHostsMiddleware(allowedHosts))

	router.POST("/next_word", app.GuessNextWord)
	router.POST("/target_word", app.GuessTargetWord)

	if err := router.Run(":8080"); err != nil {
		panic(err)
	}
}
