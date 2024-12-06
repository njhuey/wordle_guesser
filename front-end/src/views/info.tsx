import { Text, Box, Link } from "@chakra-ui/react";

import HelpText from "../components/helpText";

function Info() {
  return (
    <Box
      maxW="4xl"
      border="1px"
      borderColor="grey"
      borderRadius={30}
      p={2}
      m={0}
    >
      <Text fontSize="lg" as="b">
        General Info
      </Text>
      <br />
      <Box m={4} textAlign="left">
        Wordle Guesser is a program created by Nathan Huey to solve the daily
        Wordle. Originally created as a secret tool to gain a competitive edge
        against friends, Wordle Guesser has been adapted into a full-stack web
        app (Next.js/Django).
      </Box>
      <Box m={4} textAlign="left">
        <HelpText />
      </Box>
      <Box m={4} textAlign="left">
        Wordle Guesser uses positional letter frequency to determine the best
        guess given previously color-coded words. The process starts by
        calculating the positional letter frequency for all possible words. Then
        for each word, it calculates the sum of the positional letter frequency
        for each letter and chooses the word with the highest sum. Lastly, it
        uses the color-coded response from the Wordle site to eliminate words
        that are no longer possible. It then repeats this process.
      </Box>
      <Box m={4} textAlign="left">
        Github:{" "}
        <Link href="https://github.com/njhuey/wordlebot" target="_blank">
          https://github.com/njhuey/wordlebot
        </Link>
      </Box>
      <Box m={4} textAlign="left">
        Success Rate: 89%
        <br />
        Average Number of Guesses Needed: 4.3
      </Box>
    </Box>
  );
}

export default Info;
