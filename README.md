# Wordle Guesser

Wordle Guesser is a program created by Nathan Huey to solve the daily wordle. Originally created as a secret tool to gain a competitive edge against friends, WordleBot has been adapted into a full-stack web app (Next.js/Django).

Wordle Guesser uses positional frequency to evaluate the best guess given previously color-coded words. The process starts with first determining the positional letter frequency for all possible words. Then, it picks the word with the highest combined value for the positional frequency value for each letter. Lastly, the script removes words that are no longer possible based on the color coded response returned by wordle.

Success Rate: 89%
Average Number of Guesses Needed: 4.3

## Setup Guide

The build process of Wordle Guesser is completely automated using Docker. If you do not have Docker, you can download and install it [here](https://docs.docker.com/desktop/install/mac-install/).

To use docker to build and run Wordle Guesser:

```bash
docker compose up
```
