import { useState } from "react";
import {
  VStack,
  FormControl,
  FormErrorMessage,
  Box,
  Center,
  Input,
} from "@chakra-ui/react";
import { GenerateWord } from "./words";
const axios = require("axios");

export function CustomWordle() {
  //creates the wordle board
  const [input, setInput] = useState("");
  const [validWord, setValidWord] = useState("");
  const [customWords, setCustomWords] = useState([]);
  const [isError, setIsError] = useState(false);

  const handleInputChange = (e: any) => {
    console.log(e);
    setInput(e.target.value);
  };

  const makeCustomRequest = (word: string) => {
    //makes request to api
    axios("http://localhost:8000/guess/?word=" + word.toLowerCase())
      .then(function (response: any) {
        setCustomWords(response.data.guesses);
        setValidWord(word);
        setIsError(false);
        console.log(customWords);
      })
      .catch(function (error: any) {
        setIsError(true);
      });
  };

  const wordleBoard = [];
  for (let i = 0; i < 6; i++) {
    if (i < customWords.length) {
      wordleBoard.push(
        <GenerateWord word={customWords[i]} target={validWord} key={i} />
      );
    } else {
      wordleBoard.push(<GenerateWord word={"     "} target={validWord} />);
    }
  }
  return (
    <>
      <FormControl
        isInvalid={isError}
        onSubmit={(e) => {
          e.preventDefault();
          makeCustomRequest(input);
        }}
        pb={4}
      >
        <form>
          <Input
            type="text"
            value={input}
            onChange={handleInputChange}
            w="100%"
            maxW="sm"
            placeholder="Input 5 Letter Word"
            textTransform="lowercase"
          />
        </form>
        <Box w="100%" maxW="sm">
          <FormErrorMessage>invalid input</FormErrorMessage>
        </Box>
      </FormControl>
      <Center>
        <VStack>{wordleBoard}</VStack>
      </Center>
    </>
  );
}
