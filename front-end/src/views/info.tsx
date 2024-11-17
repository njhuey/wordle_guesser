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
        wordle. Originally created as a secret tool to gain a competitive edge
        against friends, Wordle Guesser has been adapted into a full-stack web 
        app (Next.js/Django).
      </Box>
      <Box m={4} textAlign="left">
        <HelpText />
      </Box>
      <Box m={4} textAlign="left">
        WordleBot uses positional frequency to evaluate the best guess given
        previously color-coded words. The process starts with first determining
        the positional letter frequency for all possible words. Then, it picks
        the word with the highest combined value for the positional frequency
        value for each letter. Lastly, the script removes words that are no
        longer possible based on the color coded response returned by wordle.
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
