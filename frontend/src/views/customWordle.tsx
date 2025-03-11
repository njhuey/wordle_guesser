import { useState } from "react";
import { VStack, FormControl, Center, Input, useToast } from "@chakra-ui/react";
import axios, { AxiosError } from "axios";

import { Word, BlankWord } from "../components/words";

type input = {
  target: {
    value: string;
  };
};

interface coloredWord {
  word: string;
  colors: string[];
}

function CustomWordle() {
  //creates custom wordle board
  const toast = useToast();

  const [input, setInput] = useState<string>("");
  const [validWord, setValidWord] = useState<string>("");
  const [customWords, setCustomWords] = useState<coloredWord[]>([]);
  const [isError, setIsError] = useState<boolean>(false);

  const handleInputChange = (e: input) => {
    //handles form change
    setInput(e.target.value);
  };

  const makeCustomRequest = (word: string) => {
    axios({
      method: "post",
      url: `${process.env.API_URL}/target_word`,
      data: {
        target_word: word,
      },
    })
      .then(function (response: any) {
        setCustomWords(response.data.guesses);
        setValidWord(word);
        setIsError(false);
      })
      .catch(function (e: AxiosError) {
        setIsError(true);
        if (!toast.isActive("customWordleError")) {
          toast({
            id: "customWordleError",
            title: "Invalid Word",
            description: "please input a valid 5 letter word",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        }
      });
  };

  const wordleBoard: JSX.Element[] = [];
  for (let i = 0; i < customWords.length; i++) {
    wordleBoard.push(
      <Word
        word={customWords[i].word}
        colors={customWords[i].colors}
        key={i.toString()}
      />,
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
      </FormControl>
      <Center>
        <VStack>{wordleBoard}</VStack>
      </Center>
    </>
  );
}

export default CustomWordle;
