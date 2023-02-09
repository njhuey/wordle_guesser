import { useState } from "react";
import {
  VStack,
  FormControl,
  FormErrorMessage,
  Box,
  Center,
  Input,
} from "@chakra-ui/react";
import axios, { AxiosError } from "axios";

import { Word, BlankWord } from "../components/words";

type input = {
  target: {
    value: string;
  };
};

function CustomWordle() {
  //creates custom wordle board
  const [input, setInput] = useState<string>("");
  const [validWord, setValidWord] = useState<string>("");
  const [customWords, setCustomWords] = useState<string[]>([]);
  const [isError, setIsError] = useState<boolean>(false);

  const handleInputChange = (e: input) => {
    //handles form change
    setInput(e.target.value);
  };

  const makeCustomRequest = (word: string) => {
    axios(`${process.env.DJANGO_URL}/guess?word=` + word.toLowerCase())
      .then(function (response: any) {
        setCustomWords(response.data.guesses);
        setValidWord(word);
        setIsError(false);
      })
      .catch(function (e: AxiosError) {
        setIsError(true);
      });
  };

  const generateColors = (guess: string, target: string): string[] => {
    //generates color pattern depending on the guess and target words
    const colors: string[] = ["grey", "grey", "grey", "grey", "grey"];
    target = target.toLowerCase();

    for (let i = 0; i < 5; i++) {
      if (guess[i] === target[i]) {
        colors[i] = "green";
        target = target.replace(guess[i], " ");
      }
    }

    for (let i = 0; i < 5; i++) {
      if (target.indexOf(guess[i]) !== -1 && colors[i] !== "green") {
        colors[i] = "yellow";
        target = target.replace(guess[i], " ");
      }
    }

    return colors;
  };

  const wordleBoard: JSX.Element[] = [];
  for (let i = 0; i < customWords.length; i++) {
    wordleBoard.push(
      <Word
        word={customWords[i]}
        colors={generateColors(customWords[i], validWord)}
        key={i.toString()}
      />
    );
  }

  for (let i = customWords.length; i < 6; i++) {
    wordleBoard.push(<BlankWord key={i.toString()} />);
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

export default CustomWordle;
