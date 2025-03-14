import { useState } from "react";
import { HStack, VStack, Button, Box, useToast } from "@chakra-ui/react";
import axios, { AxiosError } from "axios";

import { Word, ColorCycleWord, BlankWord } from "../components/words";

type response = {
  data: {
    next_guess: string;
    count: number;
  };
};

function DailyWordle() {
  //creates interactive wordle board used to solve the daily wordle
  const toast = useToast();

  const makeRequest = (temp_words: string[], temp_colors: number[][]) => {
    let deserializedColors = convertColors(temp_colors);
    let coloredWords = [];
    for (let i = 0; i < temp_words.length; i++) {
      coloredWords.push({
        word: temp_words[i],
        colors: deserializedColors[i],
      });
    }
    axios({
      method: "post",
      url: `${process.env.API_URL}/next_word`,
      data: coloredWords,
    })
      .then(function (response: response) {
        setWords(temp_words);
        setColors(temp_colors);
        setCycleWord(response.data.next_guess);
        setCycleColors([2, 2, 2, 2, 2]);
      })
      .catch(function (e: AxiosError) {
        console.log(e);
        if (!toast.isActive("dailyWordleError")) {
          toast({
            id: "dailyWordleError",
            title: "Impossible Wordle Board Pattern",
            description:
              "please check to make sure the color pattern is correct",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        }
      });
  };

  const convertColors = (colors: number[][]): string[][] => {
    //converts colors from numerical value to english
    let newColors: string[][] = [];
    for (let i = 0; i < colors.length; i++) {
      let wordColor: string[] = [];
      for (let j = 0; j < colors[i].length; j++) {
        wordColor.push(mapping[colors[i][j]]);
      }
      newColors.push(wordColor);
    }
    return newColors;
  };

  const [words, setWords] = useState<string[]>([]);
  const [colors, setColors] = useState<number[][]>([]);
  const [cycleWord, setCycleWord] = useState<string>("sores");
  const [cycleColors, setCycleColors] = useState<number[]>([2, 2, 2, 2, 2]);
  const [completed, setCompleted] = useState<boolean>(false);

  const mapping: { [key: number]: string } = {
    0: "green",
    1: "yellow",
    2: "grey",
  };

  const changeColor = (i: number) => {
    //cycles colors when clicked
    let tempColors: number[] = cycleColors.slice();
    tempColors[i] = (tempColors[i] + 1) % 3;
    setCycleColors(tempColors);
  };

  const onSubmit = () => {
    //validates input then progresses next step
    if (cycleColors.every((val) => val === 0)) {
      if (!completed) {
        let temp_colors: number[][] = colors.slice();
        let temp_words: string[] = words.slice();
        temp_colors.push(cycleColors);
        temp_words.push(cycleWord);
        setWords(temp_words);
        setColors(temp_colors);
        setCompleted(true);

        toast.closeAll();
        toast({
          title: "Success!",
          description: `daily wordle solved in ${temp_words.length} ${
            temp_words.length == 1 ? "guess" : "guesses"
          }`,
          status: "success",
          duration: null,
          isClosable: true,
        });
      }
    } else {
      let temp_colors: number[][] = colors.slice();
      let temp_words: string[] = words.slice();
      temp_colors.push(cycleColors);
      temp_words.push(cycleWord);
      makeRequest(temp_words, temp_colors);
    }
  };

  const onReset = () => {
    //resets the board
    setWords([]);
    setColors([]);
    setCycleWord("sores");
    setCycleColors([2, 2, 2, 2, 2]);
    setCompleted(false);
    toast.closeAll();
  };

  let coloredWords: JSX.Element[] = [];
  for (let i = 0; i < colors.length; i++) {
    coloredWords.push(
      <Word
        word={words[i]}
        colors={colors[i].map((color) => mapping[color])}
        key={i.toString()}
      />,
    );
  }

  if (coloredWords.length < 6 && !completed) {
    coloredWords.push(
      <ColorCycleWord
        word={cycleWord}
        colors={cycleColors}
        onClick={(i: number) => changeColor(i)}
        key={coloredWords.length.toString()}
      />,
    );
  }

  for (let i = coloredWords.length; i < 6; i++) {
    coloredWords.push(<BlankWord key={i.toString()} />);
  }

  return (
    <VStack>
      <Box h="20px"></Box>
      {coloredWords}
      <HStack pt="10px">
        <Button colorScheme="blue" w="162px" onClick={onSubmit}>
          Submit
        </Button>
        <Button colorScheme="blue" w="162px" onClick={onReset}>
          Reset
        </Button>
      </HStack>
    </VStack>
  );
}

export default DailyWordle;
